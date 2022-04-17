module BackendSpec (spec) where

import Prelude

import Affjax (Response)
import Affjax as AX
import Affjax.RequestBody as RequestBody
import Affjax.ResponseFormat (ResponseFormat)
import Affjax.ResponseFormat as ResponseFormat
import Affjax.StatusCode (StatusCode(..))
import AppM as App
import AppM as AppM
import Backend (Transport, createAccount', createSession')
import Backend as Backend
import Chat.Api.Http (SignInResponse(..), SignUpResponse(..))
import Control.Monad.Error.Class (class MonadThrow, catchError, throwError)
import Data.Argonaut.Core (Json, fromString, jsonEmptyArray, jsonNull, jsonSingletonObject)
import Data.Argonaut.Decode (decodeJson)
import Data.Auth.Token as Token
import Data.Either (Either(..), either)
import Data.Email (Email)
import Data.Email as Email
import Data.Function (on)
import Data.HTTP.Method (Method(..))
import Data.Maybe (maybe)
import Data.Password (Password)
import Data.Password as Password
import Data.String (Pattern(..), contains)
import Data.Username (Username)
import Data.Username as Username
import Effect.Aff (Aff)
import Effect.Class (liftEffect)
import Effect.Exception (Error, error)
import Halogen.Subscription as H
import Test.Spec (Spec, describe, it)
import Test.Spec.Assertions (fail, shouldEqual)

spec ∷ Spec Unit
spec = describe "Backend" do
  let
    username = Username.unsafe "testuser"
    password = Password.unsafe "testpass"
    email = Email.unsafe "john.doe@example.com"

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
      createAccountWithConfig server username password email >>= isSignedUp

    it "handles already created accounts" do
      let server _ = respond conflict409
      createAccountWithConfig server username password email >>= case _ of
        SignedUp → fail "Received SignedUp where AlreadyRegistered expected"
        AlreadyRegistered → pure unit
    it "handles bad requests" do
      let
        server _request = respond badRequest400
        getErr = createAccountWithConfig server username password email
      response ← getErr `catchError` checkErrorSignUp "Bad request error"
      isSignedUp response
    it "handles request error" do
      let
        server _request = pure $ Left AX.RequestFailedError
        getErr = createAccountWithConfig server username password email
      response ← getErr `catchError` checkErrorSignUp "request failed"
      isSignedUp response
    -- response `isUnexpectedError` "request failed"

    it "handles timeout error" do
      let
        server _request = pure $ Left AX.TimeoutError
        getErr = createAccountWithConfig server username password email
      response ← getErr `catchError` checkErrorSignUp "timeout"
      isSignedUp response
  -- response `isUnexpectedError` "timeout"

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
            { body = jsonSingletonObject "token" $ fromString "1234" }
      createSessionWithConfig server username password >>= isSignedIn

    it "handles request error" do
      let
        server _request = pure $ Left AX.RequestFailedError
        getErr = createSessionWithConfig server username password
      response ← getErr `catchError` checkErrorSignIn "request failed"
      isSignedIn response
    -- response `isFailure` "request failed"

    it "handles timeout error" do
      let
        server _request = pure $ Left AX.TimeoutError
        getErr = createSessionWithConfig server username password
      response ← getErr `catchError` checkErrorSignIn "timeout"
      isSignedIn response
    -- response `isFailure` "timeout"

    it "handles forbidden" do
      let server _request = respond forbidden403
      createSessionWithConfig server username password >>= case _ of
        SignedIn t →
          fail $ "Forbidden expected, but got SignedIn: " <> Token.toString t
        Forbidden → pure unit

createSessionWithConfig
  ∷ Transport → Username → Password → Aff SignInResponse
createSessionWithConfig server username password = do
  notifications ← liftEffect H.create
  let config = { notifications, backendApiUrl: "http://localhost/mock" }
  App.run config
    ( createSession' server username password
        # AppM.hoistAppM App.BackendError
    )

createAccountWithConfig
  ∷ Transport → Username → Password → Email → Aff SignUpResponse
createAccountWithConfig server username password email = do
  notifications ← liftEffect H.create
  let config = { notifications, backendApiUrl: "http://localhost/mock" }
  App.run config
    ( createAccount' server username password email
        # AppM.hoistAppM App.BackendError
    )

-- Assertions:

isSignedUp ∷ ∀ m. MonadThrow Error m ⇒ SignUpResponse → m Unit
isSignedUp = case _ of
  SignedUp → pure unit
  AlreadyRegistered → fail "SignedUp expected, but got: AlreadyRegistered"

isSignedIn ∷ ∀ m. MonadThrow Error m ⇒ SignInResponse → m Unit
isSignedIn = case _ of
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

checkErrorSignIn ∷ String → Error → Aff SignInResponse
checkErrorSignIn s e =
  if contains (Pattern s) (show e) then pure $ SignedIn (Token.unsafe "123")
  else pure Forbidden

checkErrorSignUp ∷ String → Error → Aff SignUpResponse
checkErrorSignUp s e =
  if contains (Pattern s) (show e) then pure SignedUp
  else pure AlreadyRegistered