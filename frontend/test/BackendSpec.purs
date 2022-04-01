module BackendSpec (spec) where

import Prelude

import Affjax (Response)
import Affjax as AX
import Affjax.RequestBody as RequestBody
import Affjax.ResponseFormat (ResponseFormat)
import Affjax.ResponseFormat as ResponseFormat
import Affjax.StatusCode (StatusCode(..))
import Backend (SignUpResponse(..), createAccount')
import Backend as Backend
import Control.Monad.Error.Class (class MonadThrow, throwError)
import Data.Argonaut.Core (Json, jsonEmptyArray, jsonNull, jsonSingletonObject)
import Data.Argonaut.Decode (decodeJson)
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
import Effect.Exception (Error, error)
import Test.Spec (Spec, describe, it, pending)
import Test.Spec.Assertions (fail, shouldEqual)
import Test.Spec.Assertions.String (shouldContain)

spec ∷ Spec Unit
spec = describe "Backend Spec" do
  let
    username = Username.unsafe "testuser"
    password = Password.unsafe "testpass"
    email = Email.unsafe "john.doe@example.com"

  it "create account sends proper user data to the backend" do
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
    createAccount' server username password email >>= isSignedUp

  it "create account handles already created accounts" do
    let server _ = respond conflict409
    createAccount' server username password email >>= case _ of
      SignedUp → fail "Received SignedUp where AlreadyRegistered expected"
      AlreadyRegistered → pure unit
      Unexpected err → fail $ "Unexpected error: " <> show err
      ServerErrors err →
        fail ("AlreadyRegistered expected, but got: " <> show err)

  it "create account handles bad requests" do
    let server _request = respond badRequest400
    createAccount' server username password email >>= case _ of
      SignedUp → fail "Unexpected error was expected"
      AlreadyRegistered → fail "Unexpected error was expected"
      Unexpected err →
        fail ("ServerErrors expected, but got: " <> show err)
      ServerErrors _err → pure unit

  it "create account handles request error" do
    let server _request = pure $ Left AX.RequestFailedError
    response ← createAccount' server username password email
    response `isUnexpectedError` "request failed"

  it "create account handles timeout error" do
    let server _request = pure $ Left AX.TimeoutError
    response ← createAccount' server username password email
    response `isUnexpectedError` "timeout"

  pending "creates session"

-- Assertions:
isSignedUp ∷ ∀ m. MonadThrow Error m ⇒ SignUpResponse → m Unit
isSignedUp = case _ of
  SignedUp → pure unit
  AlreadyRegistered → fail "AlreadyRegistered"
  Unexpected err → fail err
  ServerErrors err →
    fail ("SignedUp expected, but got: " <> show err)

isUnexpectedError
  ∷ ∀ m. MonadThrow Error m ⇒ SignUpResponse → String → m Unit
isUnexpectedError resp e =
  case resp of
    SignedUp → fail "Error expected"
    AlreadyRegistered → fail "Error expected"
    Unexpected err → err `shouldContain` e
    ServerErrors err →
      fail ("Error expected, but got: " <> show err)

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

eqResponseFormat
  ∷ ∀ a
  . ResponseFormat a
  → ResponseFormat a
  → Boolean
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

fromRight ∷ ∀ a m e. Show e ⇒ MonadThrow Error m ⇒ Either e a → m a
fromRight = either (throwError <<< error <<< show) pure