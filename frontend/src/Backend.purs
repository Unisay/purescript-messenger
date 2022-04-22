module Backend where

import Preamble

import Affjax (Error, Request, Response, defaultRequest, printError, request) as AX
import Affjax.RequestBody (RequestBody(..)) as AX
import Affjax.RequestHeader (RequestHeader(..)) as AX
import Affjax.ResponseFormat as ResponseFormat
import Affjax.StatusCode (StatusCode)
import Chat.Api.Http (SignInResponse(..), SignInResponseBody, SignUpResponse(..), SignUpResponseBody, UserPresence)
import Chat.Api.Http.Problem (Problem)
import Chat.Api.Http.Problem as Problem
import Control.Monad.Error.Class (class MonadThrow)
import Control.Monad.Reader (class MonadAsk)
import Control.Monad.Reader.Class (asks)
import Data.Argonaut.Core (Json)
import Data.Argonaut.Decode (JsonDecodeError, decodeJson)
import Data.Argonaut.Encode (encodeJson) as Json
import Data.Auth.Token as Auth
import Data.Email (Email)
import Data.HTTP.Method (Method(..))
import Data.Newtype (unwrap, wrap)
import Data.Password (Password)
import Data.String as String
import Data.Username (Username)
import Data.Username as Username
import Effect.Aff (Aff, throwError)
import Effect.Aff.Class (class MonadAff, liftAff)

type HasBackendConfig r = (backendApiUrl ∷ String | r)
type Transport = AX.Request Json → Aff (Either AX.Error (AX.Response Json))

data Error
  = AffjaxError AX.Error
  | ResponseDecodeError JsonDecodeError
  | ResponseStatusError { expected ∷ StatusCode, actual ∷ StatusCode }
  | ResponseProblem Problem

instance Show Error where
  show err = "Backend error: " <> case err of
    AffjaxError e →
      "AJAX request failed: " <> AX.printError e
    ResponseDecodeError e →
      "Decoding response JSON failed: " <> show e
    ResponseStatusError { expected, actual } →
      "unexpected response status "
        <> show actual
        <> ", expected: "
        <> show expected
    ResponseProblem problem →
      "server responded with Problem " <> show problem

createSession
  ∷ ∀ r m
  . MonadAff m
  ⇒ MonadAsk (Record (HasBackendConfig r)) m
  ⇒ MonadThrow Error m
  ⇒ Username
  → Password
  → m SignInResponse
createSession = createSession' AX.request

createSession'
  ∷ ∀ r m
  . MonadAff m
  ⇒ MonadAsk (Record (HasBackendConfig r)) m
  ⇒ MonadThrow Error m
  ⇒ Transport
  → Username
  → Password
  → m SignInResponse
createSession' transport username password = do
  backendApiUrl ← asks _.backendApiUrl
  response ← liftAff $ transport AX.defaultRequest
    { method = Left PUT
    , url = String.joinWith "/"
        [ backendApiUrl, "users", Username.toString username, "session" ]
    , content = Just $ AX.Json $ Json.encodeJson { username, password }
    , responseFormat = ResponseFormat.json
    }
  case response of
    Left err → throwError $ AffjaxError err
    Right { status, body } →
      case unwrap status, decodeJson body of
        200, Right (srb ∷ SignInResponseBody) → pure $ SignedIn srb.token
        200, Left err → throwError $ ResponseDecodeError err
        403, _ → pure Forbidden
        _, _ → throwError $ ResponseStatusError
          { expected: wrap 200, actual: status }

createAccount
  ∷ ∀ r m
  . MonadAff m
  ⇒ MonadAsk (Record (HasBackendConfig r)) m
  ⇒ MonadThrow Error m
  ⇒ Username
  → Password
  → Email
  → m SignUpResponse
createAccount = createAccount' AX.request

createAccount'
  ∷ ∀ r m
  . MonadAff m
  ⇒ MonadAsk (Record (HasBackendConfig r)) m
  ⇒ MonadThrow Error m
  ⇒ Transport
  → Username
  → Password
  → Email
  → m SignUpResponse
createAccount' transport username password email = do
  backendApiUrl ← asks _.backendApiUrl
  response ← liftAff $
    transport AX.defaultRequest
      { method = Left PUT
      , url = String.joinWith "/"
          [ backendApiUrl, "users", Username.toString username ]
      , content = Just $ AX.Json $ Json.encodeJson { username, password, email }
      , responseFormat = ResponseFormat.json
      }
  case response of
    Left err → throwError $ AffjaxError err
    Right { status, body } →
      case unwrap status, decodeJson body of
        200, _ → pure SignedUp
        409, _ → pure AlreadyRegistered
        400, Right (srb ∷ SignUpResponseBody) →
          throwError $ ResponseProblem $ Problem.badRequest srb.errors
        _, _ →
          throwError $ ResponseStatusError
            { expected: wrap 200, actual: status }

listUsers
  ∷ ∀ r m
  . MonadAff m
  ⇒ MonadAsk (Record (HasBackendConfig r)) m
  ⇒ MonadThrow Error m
  ⇒ Auth.Token
  → m (Array UserPresence)
listUsers = listUsers' AX.request

listUsers'
  ∷ ∀ r m
  . MonadAff m
  ⇒ MonadAsk (Record (HasBackendConfig r)) m
  ⇒ MonadThrow Error m
  ⇒ Transport
  → Auth.Token
  → m (Array UserPresence)
listUsers' transport token = do
  backendApiUrl ← asks _.backendApiUrl
  response ← liftAff $ transport AX.defaultRequest
    { method = Left GET
    , url = String.joinWith "/" [ backendApiUrl, "chat", "users" ]
    , responseFormat = ResponseFormat.json
    , headers =
        [ AX.RequestHeader "Authorization"
            ("Bearer " <> Auth.toString token)
        ]
    }
  case response of
    Left err → throwError $ AffjaxError err
    Right { status, body } →
      case unwrap status of
        200 → case decodeJson body of
          Right users → pure users
          Left err → throwError $ ResponseDecodeError err
        _ → throwError $ ResponseStatusError
          { expected: wrap 200, actual: status }
