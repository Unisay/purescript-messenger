module BackendSpec (spec) where

import Preamble

import Affjax (Error(..)) as AX
import Affjax (Response)
import Affjax.RequestBody as RequestBody
import Affjax.RequestHeader (RequestHeader(..)) as AX
import Affjax.ResponseFormat (ResponseFormat)
import Affjax.ResponseFormat as ResponseFormat
import Affjax.StatusCode (StatusCode(..))
import Backend
  ( HasBackendConfig
  , SignInResponse(..)
  , createAccount'
  , createSession'
  , deleteSession'
  , listUsers'
  , sendMessage'
  )
import Backend as Backend
import Chat.Api.Http (SignUpResponse(..), SignoutReason(..))
import Chat.Presence (Presence(..))
import Component.Notifications (HasNotifications)
import Control.Monad.Error.Class (class MonadThrow)
import Control.Monad.Error.Hoist (hoistError)
import Control.Monad.Except (ExceptT, runExceptT)
import Control.Monad.Reader (ReaderT, runReaderT)
import Crypto as Crypto
import Data.Argonaut.Core (Json, jsonEmptyArray, jsonNull, jsonSingletonObject)
import Data.Argonaut.Decode (decodeJson)
import Data.Argonaut.Encode (encodeJson)
import Data.Array as Array
import Data.Auth.Token as Token
import Data.DateTime (DateTime)
import Data.DateTime.Instant (instant, toDateTime)
import Data.Email (Email)
import Data.Email as Email
import Data.Function (on)
import Data.HTTP.Method (Method(..))
import Data.Message (Message(..))
import Data.Newtype (wrap)
import Data.Notification (Notification)
import Data.Password (Password)
import Data.Password as Password
import Data.String.NonEmpty as NES
import Data.Username (Username)
import Data.Username as Username
import Effect.Aff (Aff)
import Effect.Exception (Error, error)
import Foreign.Object (Object, fromHomogeneous)
import Halogen.Subscription (SubscribeIO)
import Halogen.Subscription as H
import Test.Spec (Spec, describe, it)
import Test.Spec.Assertions (fail, shouldEqual)
import Type.Proxy (Proxy(..))
import Unsafe.Coerce (unsafeCoerce)

spec ∷ Spec Unit
spec = describe "Backend" do
  let
    messageId = Crypto.unsafeSha256
      "f2ca1bb6c7e907d06dafe4687e579fce76b37e4e93b7605022da52e6ccc26fd2"
    author = Username.unsafe "testuser"
    password = Password.unsafe "testpass"
    email = Email.unsafe "john.doe@example.com"
    presence = Online
    reason = UserAction
    token = Token.unsafe "1234567890"
    message = Message
      { id: messageId
      , author
      , text: NES.nes (Proxy ∷ _ "nes")
      , createdAt: mockDateTime
      }
    jsonToken =
      { payload: "123"
      , signature: "456"
      , protected: "789"
      }

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
                  ∷ { author ∷ Username
                    , password ∷ Password
                    , email ∷ Email
                    }
              ) ← fromRight $ decodeJson j
              actual.author `shouldEqual` author
              (shouldEqual `on` Password.toString) actual.password password
              actual.email `shouldEqual` email
            _ → fail "NonJson body"
          respond ok200
      withConfig (createAccount' server author password email) >>= case _ of
        Right SignedUp → pure unit
        result → fail $ "SignedUp expected, but got: " <> show result

    it "handles already created accounts" do
      let server _ = respond conflict409
      withConfig (createAccount' server author password email) >>= case _ of
        Left backendError → fail (show backendError)
        Right SignedUp → fail
          "Received SignedUp where AlreadyRegistered expected"
        Right AlreadyRegistered → pure unit

    it "handles bad requests" do
      let server _request = respond badRequest400
      withConfig (createAccount' server author password email) >>= case _ of
        Left (Backend.ResponseProblem problem) →
          problem.type `shouldEqual` "urn:puremess:be:bad-request-error"
        result → fail $ "Expected ResponseProblem but got " <> show result

    it "handles request error" do
      let server _request = pure $ Left AX.RequestFailedError
      withConfig (createAccount' server author password email) >>= case _ of
        Left (Backend.AffjaxError AX.RequestFailedError) → pure unit
        result → fail $ "Expected RequestFailedError but got " <> show result

    it "handles timeout error" do
      let server _request = pure $ Left AX.TimeoutError
      withConfig (createAccount' server author password email) >>= case _ of
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
              (actual ∷ { author ∷ Username, password ∷ Password }) ←
                fromRight $ decodeJson j
              actual.author `shouldEqual` author
              (shouldEqual `on` Password.toString) actual.password password
            _ → fail "NonJson body"
          respond ok200 { body = encodeJson jsonToken }
      withConfig (createSession' server author password) >>= case _ of
        Left backendError → fail (show backendError)
        Right response → assertSignedIn response

    it "handles request error" do
      let server _request = pure $ Left AX.RequestFailedError
      withConfig (createSession' server author password) >>= case _ of
        Left (Backend.AffjaxError AX.RequestFailedError) → pure unit
        result → fail $ "Expected RequestFailedError but got " <> show result

    it "handles timeout error" do
      let server _request = pure $ Left AX.TimeoutError
      withConfig (createSession' server author password) >>= case _ of
        Left (Backend.AffjaxError AX.TimeoutError) → pure unit
        result → fail $ "Expected TimeoutError but got " <> show result

    it "handles forbidden" do
      let server _request = respond forbidden403
      withConfig (createSession' server author password) >>= case _ of
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
      withConfig (listUsers' server token) >>= case _ of
        Left err → fail $ show err
        Right srb →
          Array.head srb # maybe (fail "Response body is empty") \user → do
            user.username `shouldEqual` author
            user.presence `shouldEqual` presence
            pure unit

    it "handles request error" do
      let server _request = pure $ Left AX.RequestFailedError
      withConfig (listUsers' server token) >>= case _ of
        Left (Backend.AffjaxError AX.RequestFailedError) → pure unit
        result → fail $ "Expected RequestFailedError but got " <> show result

    it "handles timeout error" do
      let server _request = pure $ Left AX.TimeoutError
      withConfig (listUsers' server token) >>= case _ of
        Left (Backend.AffjaxError AX.TimeoutError) → pure unit
        result → fail $ "Expected TimeoutError but got " <> show result

  describe "Delete session" do
    it "sends proper data to the backend" do
      let
        server ∷ Backend.Transport
        server { method, responseFormat, content, headers } = do
          method `shouldEqual` Left DELETE
          responseFormat `assertResponseFormat` ResponseFormat.json
          headers `shouldEqual`
            [ AX.RequestHeader "Authorization"
                ("Bearer " <> Token.toString token)
            ]
          content # maybe (fail "Body is absent") case _ of
            RequestBody.Json j → do
              (actual ∷ { reason ∷ SignoutReason }) ← fromRight $ decodeJson j
              actual.reason `shouldEqual` reason
            _ → fail "NonJson body"
          respond ok200
      withConfig (deleteSession' server author token reason) >>= case _ of
        Left err → fail $ show err
        Right _ → pass

    it "handles request error" do
      let server _request = pure $ Left AX.RequestFailedError
      withConfig (deleteSession' server author token reason) >>= case _ of
        Left (Backend.AffjaxError AX.RequestFailedError) → pure unit
        result → fail $ "Expected RequestFailedError but got " <> show result

    it "handles timeout error" do
      let server _request = pure $ Left AX.TimeoutError
      withConfig (deleteSession' server author token reason) >>= case _ of
        Left (Backend.AffjaxError AX.TimeoutError) → pure unit
        result → fail $ "Expected TimeoutError but got " <> show result

  describe "Send message" do
    it "sends proper data to the backend" do
      let
        server ∷ Backend.Transport
        server { method, responseFormat, content, headers } = do
          method `shouldEqual` Left PUT
          responseFormat `assertResponseFormat` ResponseFormat.json
          headers `shouldEqual`
            [ AX.RequestHeader "Authorization"
                ("Bearer " <> Token.toString token)
            ]
          content # maybe (fail "Body is absent") case _ of
            RequestBody.Json j → do
              (actual ∷ Message) ← fromRight $ decodeJson j
              actual `shouldEqual` message
            _ → fail "NonJson body"
          respond ok200
      withConfig (sendMessage' server message token) >>= case _ of
        Left err → fail $ show err
        Right _ → pass

    it "handles request error" do
      let server _request = pure $ Left AX.RequestFailedError
      withConfig (sendMessage' server message token) >>= case _ of
        Left (Backend.AffjaxError AX.RequestFailedError) → pure unit
        result → fail $ "Expected RequestFailedError but got " <> show result

    it "handles timeout error" do
      let server _request = pure $ Left AX.TimeoutError
      withConfig (sendMessage' server message token) >>= case _ of
        Left (Backend.AffjaxError AX.TimeoutError) → pure unit
        result → fail $ "Expected TimeoutError but got " <> show result

withConfig
  ∷ ∀ e a
  . ReaderT
      (Record (HasNotifications (HasBackendConfig ())))
      (ExceptT e Aff)
      a
  → Aff (Either e a)
withConfig action = do
  notifications ∷ SubscribeIO Notification ← liftEffect H.create
  runExceptT $ runReaderT action
    { backendApiUrl: "http://localhost/mock", notifications: notifications }

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
    $ showResponseFormat r1
    <> " doesn't equal "
    <> showResponseFormat r2

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
      { author: encodeJson "testuser"
      , presence: encodeJson Online
      }
  ]

mockDateTime ∷ DateTime
mockDateTime = maybe (unsafeCoerce unit) toDateTime $ instant $ wrap 1000.0

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
fromRight = hoistError (error <<< append " fromRight " <<< show)

