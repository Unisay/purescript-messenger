module Auth where

import Preamble

import Control.Monad.Error.Class (class MonadThrow)
import Control.Monad.Except (throwError)
import Control.Monad.Reader (class MonadAsk)
import Data.Argonaut.Decode (JsonDecodeError, decodeJson)
import Data.Auth.Token (Token)
import Data.Auth.Token as Token
import Data.Traversable (for)
import Data.Username (Username)
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

type Info = { username ∷ Username, token ∷ Token }

tokenKey ∷ Storage.Key Token
tokenKey = Storage.Key "auth.token"

loadToken
  ∷ ∀ r m. MonadEffect m ⇒ MonadAsk { | HasStorage r } m ⇒ m (Maybe Token)
loadToken = Storage.readKey tokenKey (Token.parse >>> hush)

saveToken
  ∷ ∀ r m
  . MonadEffect m
  ⇒ MonadAsk { | HasStorage r } m
  ⇒ Token
  → m Unit
saveToken = Storage.writeKey tokenKey Token.toString

removeToken ∷ ∀ r m. MonadEffect m ⇒ MonadAsk { | HasStorage r } m ⇒ m Unit
removeToken = Storage.removeKey tokenKey

loadInfo
  ∷ ∀ r m
  . MonadEffect m
  ⇒ MonadThrow Error m
  ⇒ MonadAsk { | HasStorage r } m
  ⇒ m (Maybe Info)
loadInfo = do
  tok ← loadToken
  for tok decodeToken

decodeToken ∷ ∀ m. MonadThrow Error m ⇒ Token → m Info
decodeToken token =
  case dec of
    Left err → throwError $ TokenDecoding err
    Right { sub: Nothing } → throwError TokenNoSub
    Right { sub: Just username } → pure { username, token }
  where
  dec ∷ Either (JwtError JsonDecodeError) { sub ∷ Maybe Username }
  dec = Jwt.decodeWith decodeJson (Token.toString token)

loadedInfo
  ∷ ∀ m r
  . MonadEffect m
  ⇒ MonadAsk { | HasStorage r } m
  ⇒ MonadThrow Error m
  ⇒ m Info
loadedInfo = loadInfo >>= maybe (throwError TokenIsMissing) pure

