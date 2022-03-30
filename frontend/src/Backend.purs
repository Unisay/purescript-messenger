module Backend where

import Prelude

import Affjax
  ( Error
  , Request
  , Response
  , defaultRequest
  , printError
  , request
  ) as AX
import Affjax.RequestBody (RequestBody(..)) as AX
import Affjax.ResponseFormat as ResponseFormat
import Data.Argonaut.Decode (decodeJson)
import Data.Argonaut.Encode (encodeJson) as Json
import Data.Auth.Token (Token)
import Data.Either (Either(..))
import Data.Email (Email)
import Data.HTTP.Method (Method(..))
import Data.Maybe (Maybe(..))
import Data.Newtype (unwrap)
import Data.Password (Password)
import Data.Username (Username)
import Data.Username as Username
import Effect.Aff (Aff)
import Effect.Aff.Class (class MonadAff, liftAff)

data SignInResponse
  = SignedIn Token
  | Forbidden
  | Failure String

data SignUpResponse
  = SignedUp
  | AlreadyRegistered
  | Unexpected String

instance Show SignInResponse where
  show = case _ of
    SignedIn _token → "Signed In"
    Forbidden → "Sign in is forbidden"
    Failure statusCode → "Failure: " <> show statusCode

type SignInResponseBody = { token ∷ Token }

type SignUpResponseBody = Array String

createSession
  ∷ ∀ m. MonadAff m ⇒ Username → Password → m SignInResponse
createSession username password = do
  response ← liftAff $
    AX.request
      AX.defaultRequest
        { method = Left PUT
        , url = "http://localhost:8081/users/"
            <> Username.toString username
            <> "/session"
        , content = Just $ AX.Json $ Json.encodeJson { username, password }
        , responseFormat = ResponseFormat.json
        }
  pure case response of
    Left err → Failure (AX.printError err)
    Right { status, body } →
      case unwrap status, decodeJson body of
        200, Right (srb ∷ SignInResponseBody) → SignedIn srb.token
        403, _ → Forbidden
        _, _ → Failure (show status)

createAccount
  ∷ ∀ m. MonadAff m ⇒ Username → Password → Email → m SignUpResponse
createAccount = createAccount' AX.request

type Transport = ∀ a. AX.Request a → Aff (Either AX.Error (AX.Response a))

createAccount'
  ∷ ∀ m
  . MonadAff m
  ⇒ Transport
  → Username
  → Password
  → Email
  → m SignUpResponse
createAccount' transport username password email = do
  response ← liftAff $
    transport AX.defaultRequest
      { method = Left PUT
      , url = "http://localhost:8081/users/" <> Username.toString username
      , content = Just $ AX.Json $ Json.encodeJson { username, password, email }
      , responseFormat = ResponseFormat.json
      }
  pure case response of
    Left err → Unexpected $ AX.printError err
    Right { status, body } →
      case unwrap status, decodeJson body of
        200, _ → SignedUp
        409, _ → AlreadyRegistered
        _, Right (srb ∷ SignUpResponseBody) →
          Unexpected $ "Got status: "
            <> show status
            <> "and errors: "
            <> show srb
        _, _ → Unexpected $ show status

