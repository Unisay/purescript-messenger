module Backend where

import Preamble

import Affjax (Request, defaultRequest) as AX
import Affjax.RequestBody as RB
import Affjax.RequestHeader (RequestHeader(..)) as AX
import Affjax.RequestHeader (RequestHeader)
import Affjax.ResponseFormat as ResponseFormat
import Affjax.StatusCode (StatusCode(..))
import Affjax.Web as AW
import Chat.Api.Http
  ( SignInResponseBody
  , SignUpResponse(..)
  , SignUpResponseBody
  , SignoutReason
  , UserPresence
  )
import Chat.Api.Http.Problem (Problem)
import Chat.Api.Http.Problem as Problem
import Control.Monad.Error.Class (class MonadThrow)
import Control.Monad.Error.Hoist ((<!%?>), (<%?>))
import Control.Monad.Reader (class MonadAsk)
import Control.Monad.Reader.Class (asks)
import Data.Argonaut.Core (Json)
import Data.Argonaut.Decode (class DecodeJson, JsonDecodeError(..), decodeJson)
import Data.Argonaut.Encode (encodeJson) as Json
import Data.Array (catMaybes)
import Data.Auth.Token (Token)
import Data.Auth.Token as Token
import Data.Email (Email)
import Data.HTTP.Method (Method(..))
import Data.Message (Cursor, Message)
import Data.Message as Message
import Data.Newtype (unwrap, wrap)
import Data.Password (Password)
import Data.String as String
import Data.Time.Duration (Milliseconds(..))
import Data.Tuple (Tuple(..))
import Data.Username (Username)
import Data.Username as Username
import Effect.Aff (Aff, throwError)
import Effect.Aff.Class (class MonadAff, liftAff)
import LocalStorage (HasStorage)
import URI.Extra.QueryPairs as QP
import URI.Query as Q

type HasBackendConfig r = (backendApiUrl ∷ String | r)
type Transport = AW.Request Json → Aff (Either AW.Error (AW.Response Json))

data Error
  = AffjaxError AW.Error
  | ResponseDecodeError String JsonDecodeError
  | ResponseStatusError { expected ∷ StatusCode, actual ∷ StatusCode }
  | ResponseProblem Problem

instance Show Error where
  show err = "Backend error: " <> case err of
    AffjaxError e →
      "AJAX request failed: " <> AW.printError e
    ResponseDecodeError endpoint e →
      "decoding " <> endpoint <> " response JSON failed: " <> show e
    ResponseStatusError { expected, actual } →
      "unexpected response status: "
        <> show actual
        <> ", expected: "
        <> show expected
    ResponseProblem problem →
      "server responded with Problem: " <> show problem

data SignInResponse
  = SignedIn Token
  | Forbidden

instance Show SignInResponse where
  show = case _ of
    SignedIn _token → "Signed In"
    Forbidden → "Sign in is forbidden"

derive instance Eq SignInResponse

createSession
  ∷ ∀ r m
  . MonadAff m
  ⇒ MonadAsk (Record (HasBackendConfig r)) m
  ⇒ MonadThrow Error m
  ⇒ Username
  → Password
  → m SignInResponse
createSession = createSession' AW.request

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
  { status, body } ←
    liftAff
      ( transport defaultBackendRequest
          { method = Left PUT
          , url = String.joinWith "/"
              [ backendApiUrl
              , "users"
              , Username.toString username
              , "session"
              ]
          , content = Just $ RB.Json $ Json.encodeJson { username, password }
          , responseFormat = ResponseFormat.json
          }
      ) <!%?> AffjaxError
  case unwrap status, decodeJson body of
    200, Right (token ∷ SignInResponseBody) → pure
      $ SignedIn token
    200, Left err → do
      throwError $ ResponseDecodeError "createSession" err
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
createAccount = createAccount' AW.request

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
    transport defaultBackendRequest
      { method = Left PUT
      , url = String.joinWith "/"
          [ backendApiUrl, "users", Username.toString username ]
      , content = Just $ RB.Json $ Json.encodeJson { username, password, email }
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
  ⇒ Token
  → m (Array UserPresence)
listUsers = listUsers' AW.request

listUsers'
  ∷ ∀ r m
  . MonadAff m
  ⇒ MonadAsk (Record (HasBackendConfig r)) m
  ⇒ MonadThrow Error m
  ⇒ Transport
  → Token
  → m (Array UserPresence)
listUsers' transport token = do
  backendApiUrl ← asks _.backendApiUrl
  { status, body } ←
    liftAff
      ( transport defaultBackendRequest
          { method = Left GET
          , url = String.joinWith "/" [ backendApiUrl, "chat", "users" ]
          , responseFormat = ResponseFormat.json
          , headers = [ authorization token ]
          }
      ) <!%?> AffjaxError
  case status of
    StatusCode 200 → decodeJson body <%?> ResponseDecodeError "listUsers"
    _ → throwError $ ResponseStatusError
      { expected: wrap 200, actual: status }

deleteSession
  ∷ ∀ r m
  . MonadAff m
  ⇒ MonadThrow Error m
  ⇒ MonadAsk (Record (HasBackendConfig (HasStorage r))) m
  ⇒ Username
  → Token
  → SignoutReason
  → m Unit
deleteSession = deleteSession' AW.request

deleteSession'
  ∷ ∀ r m
  . MonadAff m
  ⇒ MonadThrow Error m
  ⇒ MonadAsk (Record (HasBackendConfig r)) m
  ⇒ Transport
  → Username
  → Token
  → SignoutReason
  → m Unit
deleteSession' transport username token reason = do
  backendApiUrl ← asks _.backendApiUrl
  { status } ←
    liftAff
      ( transport defaultBackendRequest
          { method = Left DELETE
          , url = String.joinWith "/"
              [ backendApiUrl, "chat", "users", Username.toString username ]
          , responseFormat = ResponseFormat.json
          , content = Just $ RB.Json $ Json.encodeJson { reason }
          , headers = [ authorization token ]
          }
      ) <!%?> AffjaxError
  case status of
    StatusCode 200 → pass
    actual → throwError $ ResponseStatusError
      { expected: StatusCode 200, actual }

sendMessage
  ∷ ∀ m r
  . MonadAff m
  ⇒ MonadAsk (Record (HasBackendConfig r)) m
  ⇒ MonadThrow Error m
  ⇒ Message
  → Token
  → m Unit
sendMessage = sendMessage' AW.request

sendMessage'
  ∷ ∀ m r
  . MonadAff m
  ⇒ MonadAsk (Record (HasBackendConfig r)) m
  ⇒ MonadThrow Error m
  ⇒ Transport
  → Message
  → Token
  → m Unit
sendMessage' transport message token = do
  backendApiUrl ← asks _.backendApiUrl
  { status } ←
    liftAff
      ( transport defaultBackendRequest
          { method = Left PUT
          , url = String.joinWith "/"
              [ backendApiUrl, "chat", Message.renderId message ]
          , responseFormat = ResponseFormat.json
          , content = Just $ RB.Json $ Json.encodeJson message
          , headers = [ authorization token ]
          }
      ) <!%?> AffjaxError
  case status of
    StatusCode 200 → pass
    actual → throwError $ ResponseStatusError
      { expected: StatusCode 200, actual }

data Direction = Backward | Forward

derive instance Eq Direction

instance DecodeJson Direction where
  decodeJson v = decodeJson v >>= case _ of
    "Forward" → Right Forward
    "Backward" → Right Backward
    result → Left $ TypeMismatch $ "`Direction` value was expected, but got: "
      <> result

renderDirection ∷ Direction → String
renderDirection = case _ of
  Backward → "b"
  Forward → "f"

messagesFromCursor'
  ∷ ∀ m r
  . MonadAff m
  ⇒ MonadAsk (Record (HasBackendConfig r)) m
  ⇒ MonadThrow Error m
  ⇒ Transport
  → Maybe Cursor
  → Direction
  → Token
  → m
      { prevCursor ∷ Cursor
      , nextCursor ∷ Cursor
      , items ∷ Array Message
      }
messagesFromCursor' transport mbCursor direction token = do
  backendApiUrl ← asks _.backendApiUrl
  let
    url = (String.joinWith "/" [ backendApiUrl, "chat", "messages" ])
      <> Q.print
        ( QP.print QP.keyFromString QP.valueFromString
            ( QP.QueryPairs $ catMaybes
                [ Tuple "cursor" <<< Just <$> mbCursor
                , Just $ Tuple "direction" (Just (renderDirection direction))
                ]
            )
        )
  { status, body } ←
    liftAff
      ( transport
          defaultBackendRequest
            { method = Left GET
            , url = url
            , responseFormat = ResponseFormat.json
            , headers = [ authorization token ]
            }
      ) <!%?> AffjaxError
  case status of
    StatusCode 200 →
      decodeJson body <%?> ResponseDecodeError "messagesFromCursor"
    _ → throwError $ ResponseStatusError { expected: wrap 200, actual: status }

messagesFromCursor
  ∷ ∀ m r
  . MonadAff m
  ⇒ MonadAsk (Record (HasBackendConfig r)) m
  ⇒ MonadThrow Error m
  ⇒ Maybe Cursor
  → Direction
  → Token
  → m
      { prevCursor ∷ Cursor
      , nextCursor ∷ Cursor
      , items ∷ Array Message
      }
messagesFromCursor = messagesFromCursor' AW.request

authorization ∷ Token → RequestHeader
authorization token =
  AX.RequestHeader "Authorization" ("Bearer " <> Token.toString token)

defaultBackendRequest ∷ AX.Request Unit
defaultBackendRequest = AX.defaultRequest
  { timeout = Just (Milliseconds 5000.0) }
