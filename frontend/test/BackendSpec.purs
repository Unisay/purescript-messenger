module BackendSpec (spec) where

import Prelude

import Affjax (Error(..)) as AX
import Affjax (Response)
import Affjax.RequestBody as RequestBody
import Affjax.RequestHeader (RequestHeader(..)) as AX
import Affjax.ResponseFormat (ResponseFormat)
import Affjax.ResponseFormat as ResponseFormat
import Affjax.StatusCode (StatusCode(..))
import Backend (Transport, createAccount', createSession', listUsers')
import Backend as Backend
import Chat.Api.Http (SignInResponse(..), SignUpResponse(..), UserPresence)
import Chat.Presence (Presence(..))
import Control.Monad.Error.Class (class MonadThrow, throwError)
import Control.Monad.Except (runExceptT)
import Control.Monad.Reader (runReaderT)
import Data.Argonaut.Core (Json, jsonEmptyArray, jsonNull, jsonSingletonObject)
import Data.Argonaut.Decode (decodeJson)
import Data.Argonaut.Encode (encodeJson)
import Data.Array as Array
import Data.Auth.Token as Auth
import Data.Auth.Token as Token
import Data.Either (Either(..), either)
import Data.Email (Email)
import Data.Email as Email
import Data.Function (on)
import Data.HTTP.Method (Method(..))
import Data.Maybe (maybe)
import Data.Password (Password)
import Data.Password as Password
import Data.Username (Username)
import Data.Username as Username
import Effect.Aff (Aff)
import Effect.Class (liftEffect)
import Effect.Exception (Error, error)
import Foreign.Object (Object, fromHomogeneous)
import Halogen.Subscription as H
import Test.Spec (Spec, describe, it)
import Test.Spec.Assertions (fail, shouldEqual)

spec ∷ Spec Unit
spec = describe "Backend" do
  let
    username = Username.unsafe "testuser"
    password = Password.unsafe "testpass"
    email = Email.unsafe "john.doe@example.com"
    token = Token.unsafe "1234567890"
    presence = Online

  describe "Create account" do
    it "sends proper user data to the backend" do
      let
        server ∷ Backend.Transport
        server { method, responseFormat, content } = do
          method `shouldEqual` Left PUT
          ResponseFormat.json `assertResponseFormat` responseFormat
          content # maybe (fail "Body is absent") case _ of
            RequestBody.Json j → do
              ( actual
                  ∷ { username ∷ Username
                    , password ∷ Password
                    , email ∷ Email
                    }
              ) ← fromRight $ decodeJson j
              actual.username `shouldEqual` username
              (shouldEqual `on` Password.toString) actual.password password
              actual.email `shouldEqual` email
            _ → fail "NonJson body"
          respond ok200
      createAccountWithConfig server username password email >>= case _ of
        Right SignedUp → pure unit
        result → fail $ "SignedUp expected, but got: " <> show result

    it "handles already created accounts" do
      let server _ = respond conflict409
      createAccountWithConfig server username password email >>= case _ of
        Left backendError → fail (show backendError)
        Right SignedUp → fail
          "Received SignedUp where AlreadyRegistered expected"
        Right AlreadyRegistered → pure unit

    it "handles bad requests" do
      let server _request = respond badRequest400
      createAccountWithConfig server username password email >>= case _ of
        Left (Backend.ResponseProblem problem) →
          problem.type `shouldEqual` "urn:puremess:be:bad-request-error"
        result → fail $ "Expected ResponseProblem but got " <> show result

    it "handles request error" do
      let server _request = pure $ Left AX.RequestFailedError
      createAccountWithConfig server username password email >>= case _ of
        Left (Backend.AffjaxError AX.RequestFailedError) → pure unit
        result → fail $ "Expected RequestFailedError but got " <> show result

    it "handles timeout error" do
      let server _request = pure $ Left AX.TimeoutError
      createAccountWithConfig server username password email >>= case _ of
        Left (Backend.AffjaxError AX.TimeoutError) → pure unit
        result → fail $ "Expected TimeoutError but got " <> show result

  describe "Create session" do
    it "sends proper user data to the backend" do
      let
        server ∷ Backend.Transport
        server { method, responseFormat, content } = do
          method `shouldEqual` Left PUT
          ResponseFormat.json `assertResponseFormat` responseFormat
          content # maybe (fail "Body is absent") case _ of
            RequestBody.Json j → do
              (actual ∷ { username ∷ Username, password ∷ Password }) ←
                fromRight $ decodeJson j
              actual.username `shouldEqual` username
              (shouldEqual `on` Password.toString) actual.password password
            _ → fail "NonJson body"
          respond ok200
            { body = jsonSingletonObject "token" $
                encodeJson (Token.toString token)
            }
      createSessionWithConfig server username password >>= case _ of
        Left backendError → fail (show backendError)
        Right response → assertSignedIn response

    it "handles request error" do
      let server _request = pure $ Left AX.RequestFailedError
      createSessionWithConfig server username password >>= case _ of
        Left (Backend.AffjaxError AX.RequestFailedError) → pure unit
        result → fail $ "Expected RequestFailedError but got " <> show result

    it "handles timeout error" do
      let server _request = pure $ Left AX.TimeoutError
      createSessionWithConfig server username password >>= case _ of
        Left (Backend.AffjaxError AX.TimeoutError) → pure unit
        result → fail $ "Expected TimeoutError but got " <> show result

    it "handles forbidden" do
      let server _request = respond forbidden403
      createSessionWithConfig server username password >>= case _ of
        Right Forbidden → pure unit
        result → fail $ "Forbidden expected, got: " <> show result

  describe "List users" do
    it "sends proper data to the backend" do
      let
        server ∷ Backend.Transport
        server { method, responseFormat, headers } = do
          method `shouldEqual` Left GET
          responseFormat `assertResponseFormat` ResponseFormat.json
          headers `shouldEqual`
            [ AX.RequestHeader "Authorization"
                ("Bearer " <> Token.toString token)
            ]
          respond ok200 { body = encodeJson mockUserList }
      listUsersWithConfig server token >>= case _ of
        Left err → fail $ show err
        Right srb →
          Array.head srb # maybe (fail "Response body is empty") \user → do
            user.username `shouldEqual` username
            user.presence `shouldEqual` presence
            pure unit

    it "handles request error" do
      let server _request = pure $ Left AX.RequestFailedError
      listUsersWithConfig server token >>= case _ of
        Left (Backend.AffjaxError AX.RequestFailedError) → pure unit
        result → fail $ "Expected RequestFailedError but got " <> show result

    it "handles timeout error" do
      let server _request = pure $ Left AX.TimeoutError
      listUsersWithConfig server token >>= case _ of
        Left (Backend.AffjaxError AX.TimeoutError) → pure unit
        result → fail $ "Expected TimeoutError but got " <> show result

createSessionWithConfig
  ∷ Transport
  → Username
  → Password
  → Aff (Either Backend.Error SignInResponse)
createSessionWithConfig server username password = do
  notifications ← liftEffect H.create
  runExceptT $ runReaderT (createSession' server username password)
    { notifications, backendApiUrl: "http://localhost/mock" }

createAccountWithConfig
  ∷ Transport
  → Username
  → Password
  → Email
  → Aff (Either Backend.Error SignUpResponse)
createAccountWithConfig server username password email = do
  notifications ← liftEffect H.create
  runExceptT $ runReaderT (createAccount' server username password email)
    { notifications, backendApiUrl: "http://localhost/mock" }

listUsersWithConfig
  ∷ Transport
  → Auth.Token
  → Aff (Either Backend.Error (Array UserPresence))
listUsersWithConfig server token = do
  notifications ← liftEffect H.create
  runExceptT $ runReaderT (listUsers' server token)
    { notifications, backendApiUrl: "http://localhost/mock" }

-- Assertions:

assertSignedIn ∷ ∀ m. MonadThrow Error m ⇒ SignInResponse → m Unit
assertSignedIn = case _ of
  SignedIn _ → pure unit
  Forbidden → fail "SignedIn expected, got Forbidden instead"

assertResponseFormat
  ∷ ∀ a m
  . MonadThrow Error m
  ⇒ ResponseFormat a
  → ResponseFormat a
  → m Unit
assertResponseFormat r1 r2 =
  if r1 `eqResponseFormat` r2 then pure unit
  else fail
    $ showResponseFormat r1 <> " doesn't equal " <> showResponseFormat r2

eqResponseFormat ∷ ∀ a. ResponseFormat a → ResponseFormat a → Boolean
eqResponseFormat = eq `on` showResponseFormat

showResponseFormat ∷ ∀ a. ResponseFormat a → String
showResponseFormat = case _ of
  ResponseFormat.ArrayBuffer _ → "ArrayBuffer"
  ResponseFormat.Blob _ → "Blob"
  ResponseFormat.Document _ → "Document"
  ResponseFormat.Json _ → "Json"
  ResponseFormat.String _ → "String"
  ResponseFormat.Ignore _ → "Ignore"

respond ∷ ∀ a. a → Aff (Either AX.Error a)
respond = pure <<< Right

mockUserList ∷ Array (Object Json)
mockUserList =
  [ fromHomogeneous
      { username: encodeJson "testuser"
      , presence: encodeJson Online
      }
  ]

ok200 ∷ Response Json
ok200 =
  { status: StatusCode 200
  , statusText: "OK"
  , headers: []
  , body: jsonNull
  }

conflict409 ∷ Response Json
conflict409 =
  { status: StatusCode 409
  , statusText: "Conflict"
  , headers: []
  , body: jsonSingletonObject "errors" jsonEmptyArray
  }

badRequest400 ∷ Response Json
badRequest400 =
  { status: StatusCode 400
  , statusText: "Bad request"
  , headers: []
  , body: jsonSingletonObject "errors" jsonEmptyArray
  }

forbidden403 ∷ Response Json
forbidden403 =
  { status: StatusCode 403
  , statusText: "Forbidden"
  , headers: []
  , body: jsonNull
  }

fromRight ∷ ∀ a m e. Show e ⇒ MonadThrow Error m ⇒ Either e a → m a
fromRight = either (throwError <<< error <<< show) pure

