module Auth where

import Preamble

import Control.Monad.Error.Class (class MonadThrow)
import Control.Monad.Except (throwError)
import Control.Monad.Reader (class MonadAsk)
import Data.Argonaut.Decode (JsonDecodeError, decodeJson)
import Data.Auth.Token (Token)
import Data.Auth.Token as Auth
import Data.Auth.Token as Token
import Data.Route (Route(..), goTo)
import Data.Username (Username)
import Effect.Class (class MonadEffect)
import Jwt (JwtError(..))
import Jwt as Jwt
import LocalStorage (HasStorage)
import LocalStorage as Storage

data Error
  = TokenDecoding (JwtError JsonDecodeError)
  | TokenIsMissing
  | TokenNoSub

instance Show Error where
  show = case _ of
    TokenDecoding err →
      "Failed to decode auth token: " <>
        case err of
          MalformedToken → "Malformed token"
          Base64DecodeError e → "Base63 decode error: " <> show e
          JsonDecodeError a → "JSON decode error: " <> show a
          JsonParseError e → "JSON parse error: " <> show e
    TokenIsMissing → "Authentication token is missing"
    TokenNoSub → "Authentication token contains no sub claim"

tokenKey ∷ Storage.Key Auth.Token
tokenKey = Storage.Key "auth.token"

getAuth
  ∷ ∀ r m
  . MonadEffect m
  ⇒ MonadAsk { | HasStorage r } m
  ⇒ m (Maybe Auth.Token)
getAuth = Storage.readKey tokenKey (Token.parse >>> hush)

setAuth
  ∷ ∀ r m
  . MonadEffect m
  ⇒ MonadAsk { | HasStorage r } m
  ⇒ Auth.Token
  → m Unit
setAuth = Storage.writeKey tokenKey Token.toString

removeAuth ∷ ∀ r m. MonadEffect m ⇒ MonadAsk { | HasStorage r } m ⇒ m Unit
removeAuth = Storage.removeKey tokenKey

withAuth
  ∷ ∀ r m
  . MonadEffect m
  ⇒ MonadAsk { | HasStorage r } m
  ⇒ (Auth.Token → m Unit)
  → m Unit
withAuth cb = maybe (goTo SignIn) cb =<< getAuth

username
  ∷ ∀ r m
  . MonadEffect m
  ⇒ MonadThrow Error m
  ⇒ MonadAsk { | HasStorage r } m
  ⇒ m Username
username =
  jwtToken >>= case _ of
    { sub: Just name } → pure name
    _ → throwError TokenNoSub

token
  ∷ ∀ m r
  . MonadEffect m
  ⇒ MonadAsk { | HasStorage r } m
  ⇒ MonadThrow Error m
  ⇒ m Token
token = getAuth >>= maybe (throwError TokenIsMissing) pure

type JwtToken = { sub ∷ Maybe Username }

jwtToken
  ∷ ∀ r m
  . MonadEffect m
  ⇒ MonadThrow Error m
  ⇒ MonadAsk { | HasStorage r } m
  ⇒ m JwtToken
jwtToken =
  token >>= Token.toString
    >>> Jwt.decodeWith decodeJson
    >>> either (TokenDecoding >>> throwError) pure
