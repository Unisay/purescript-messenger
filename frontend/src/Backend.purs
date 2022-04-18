module Backend where

import Prelude

import Affjax (Error, Request, Response, defaultRequest, printError, request) as AX
import Affjax.RequestBody (RequestBody(..)) as AX
import Affjax.ResponseFormat as ResponseFormat
import Affjax.StatusCode (StatusCode)
import Chat.Api.Http (ListUsersResponse(..), SignInResponse(..), SignInResponseBody, SignUpResponse(..), SignUpResponseBody, UserPresence)
import Chat.Api.Http.Problem (Problem)
import Chat.Api.Http.Problem as Problem
import Control.Monad.Error.Class (class MonadThrow)
import Control.Monad.Reader (class MonadAsk)
import Control.Monad.Reader.Class (asks)
import Data.Argonaut.Core (Json)
import Data.Argonaut.Decode (JsonDecodeError, decodeJson)
import Data.Argonaut.Encode (encodeJson) as Json
import Data.Either (Either(..))
import Data.Email (Email)
import Data.HTTP.Method (Method(..))
import Data.Maybe (Maybe(..))
import Data.Newtype (unwrap, wrap)
import Data.Password (Password)
import Data.String as String
import Data.Username (Username)
import Data.Username as Username
import Effect.Aff (Aff, throwError)
import Effect.Aff.Class (class MonadAff, liftAff)

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
      "unexpected response status (" <> show actual
        <> "), expected: "
        <> show expected
    ResponseProblem problem →
      "server responded with Problem " <> show problem

createSession
  ∷ ∀ r m
  . MonadAff m
  ⇒ MonadAsk { backendApiUrl ∷ String | r } m
  ⇒ MonadThrow Error m
  ⇒ Username
  → Password
  → m SignInResponse
createSession = createSession' AX.request

createSession'
  ∷ ∀ r m
  . MonadAff m
  ⇒ MonadAsk { backendApiUrl ∷ String | r } m
  ⇒ MonadThrow Error m
  ⇒ Transport
  → Username
  → Password
  → m SignInResponse
createSession' transport username password = do
  backendApiUrl ← asks _.backendApiUrl
  response ← liftAff $
    transport
      AX.defaultRequest
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
  ⇒ MonadAsk { backendApiUrl ∷ String | r } m
  ⇒ MonadThrow Error m
  ⇒ Username
  → Password
  → Email
  → m SignUpResponse
createAccount = createAccount' AX.request

type Transport = AX.Request Json → Aff (Either AX.Error (AX.Response Json))

createAccount'
  ∷ ∀ r m
  . MonadAff m
  ⇒ MonadAsk { backendApiUrl ∷ String | r } m
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
        400, Right (srb ∷ SignUpResponseBody) → throwError
          $ ResponseProblem
          $ Problem.badRequest
          $ pure srb.errors
        _, _ → throwError $ ResponseStatusError
          { expected: wrap 200, actual: status }

listUsers ∷ ∀ m. MonadAff m ⇒ MonadThrow Error m ⇒ m ListUsersResponse
listUsers = listUsers' AX.request

listUsers'
  ∷ ∀ m. MonadAff m ⇒ MonadThrow Error m ⇒ Transport → m ListUsersResponse
listUsers' transport = do
  response ← liftAff $ transport AX.defaultRequest
    { method = Left GET
    , url = "http://localhost:8081/chat/users"
    , responseFormat = ResponseFormat.json
    }
  case response of
    Left err → throwError $ AffjaxError err
    Right { status, body } →
      case unwrap status, decodeJson body of
        200, Right (srb ∷ Array UserPresence) → pure $ Successful srb
        403, _ → pure Unauthorized
        _, Left err → throwError $ ResponseDecodeError err
        _, _ → throwError $ ResponseStatusError
          { expected: wrap 200, actual: status }
