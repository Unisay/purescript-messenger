module Backend where

import Prelude

import Affjax (defaultRequest, printError, request) as AX
import Affjax.RequestBody (RequestBody(..)) as AX
import Affjax.ResponseFormat as ResponseFormat
import Data.Argonaut.Decode (decodeJson)
import Data.Argonaut.Encode (encodeJson) as Json
import Data.Auth.Token (Token)
import Data.Either (Either(..))
import Data.HTTP.Method (Method(..))
import Data.Maybe (Maybe(..))
import Data.Newtype (unwrap)
import Data.Password (Password)
import Data.Username (Username)
import Data.Username as Username
import Effect.Aff.Class (class MonadAff, liftAff)

data SignInResponse
  = SignedIn Token
  | Forbidden
  | Failure String

instance Show SignInResponse where
  show = case _ of
    SignedIn _token → "Signed In"
    Forbidden → "Sign in is forbidden"
    Failure statusCode → "Failure: " <> show statusCode

type SignInResponseBody = { token ∷ Token }

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
  let
    serverResponse =
      case response of
        Left err → Failure (AX.printError err)
        Right { status, body } →
          case unwrap status, decodeJson body of
            200, Right (srb ∷ SignInResponseBody) → SignedIn srb.token
            403, _ → Forbidden
            _, _ → Failure (show status)
  pure serverResponse
