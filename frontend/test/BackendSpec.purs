module BackendSpec (spec) where

import Prelude

import Affjax as AX
import Backend (SignUpResponse(..))
import Backend as Backend
import Control.Monad.Error.Class (class MonadThrow)
import Data.Either (Either(..))
import Data.Email as Email
import Data.HTTP.Method (Method(..))
import Data.Password as Password
import Data.Username as Username
import Effect.Exception (Error)
import Test.Spec (Spec, describe, it, pending, pending')
import Test.Spec.Assertions (fail, shouldEqual)
import Test.Spec.Assertions.String (shouldContain)

spec ∷ Spec Unit
spec = describe "Backend Spec" do
  let
    username = Username.unsafe "testuser"
    password = Password.unsafe "testpass"
    email = Email.unsafe "john.doe@example.com"

  pending' "create account sends proper user data to the backend" do
    let
      mockTransport ∷ Backend.Transport
      mockTransport { method } = do
        method `shouldEqual` Left GET
        pure $ Left AX.RequestFailedError
    Backend.createAccount' mockTransport username password email >>= isSignedUp

  it "create account handles request error" do
    let
      mockTransport ∷ Backend.Transport
      mockTransport _request = pure $ Left AX.RequestFailedError
    response ← Backend.createAccount' mockTransport username password email
    response `isUnexpectedError` "request failed"

  it "create account handles timeout error" do
    let
      mockTransport ∷ Backend.Transport
      mockTransport _request = pure $ Left AX.TimeoutError
    response ← Backend.createAccount' mockTransport username password email
    response `isUnexpectedError` "timeout"

  pending "creates session"

-- Assertions:

isSignedUp = case _ of
  SignedUp → pure unit
  AlreadyRegistered → fail "AlreadyRegistered"
  Unexpected err → fail err

isUnexpectedError
  ∷ ∀ m. MonadThrow Error m ⇒ SignUpResponse → String → m Unit
isUnexpectedError resp e =
  case resp of
    SignedUp → fail "Error expected"
    AlreadyRegistered → fail "Error expected"
    Unexpected err → err `shouldContain` e
