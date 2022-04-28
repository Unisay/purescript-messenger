module Auth where

import Preamble

import Control.Monad.Error.Class (class MonadThrow)
import Control.Monad.Except (throwError)
import Control.Monad.Reader (class MonadAsk)
import Data.Array.NonEmpty (NonEmptyArray)
import Data.Array.NonEmpty as NEA
import Data.Auth.Token (Token)
import Data.Auth.Token as Auth
import Data.Auth.Token as Token
import Data.List.NonEmpty (NonEmptyList)
import Data.List.NonEmpty as NEL
import Data.Route (Route(..), goTo)
import Data.Username (Username)
import Data.Username as Username
import Effect.Class (class MonadEffect)
import LocalStorage (HasStorage)
import LocalStorage as Storage
import Node.Jwt as Jwt

data Error
  = TokenDecoding (NonEmptyList String)
  | TokenIsMissing
  | TokenInvalidUsername (NonEmptyArray String)
  | TokenNoSub

instance Show Error where
  show = case _ of
    TokenDecoding errs →
      "Failed to decode auth token: " <> NEL.intercalate "; " errs
    TokenIsMissing →
      "Authentication token is missing"
    TokenInvalidUsername errs →
      "Authentication token contains invalid username: "
        <> NEA.intercalate "; " errs
    TokenNoSub →
      "Authentication token contains no sub claim"

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
    { claims: { sub: Just subject } } →
      Username.parse subject #
        either (throwError <<< TokenInvalidUsername) pure
    _ → throwError TokenNoSub

token
  ∷ ∀ m r
  . MonadEffect m
  ⇒ MonadAsk { | HasStorage r } m
  ⇒ MonadThrow Error m
  ⇒ m Token
token = getAuth >>= maybe (throwError TokenIsMissing) pure

jwtToken
  ∷ ∀ r m
  . MonadEffect m
  ⇒ MonadThrow Error m
  ⇒ MonadAsk { | HasStorage r } m
  ⇒ m (Jwt.Token () Jwt.Unverified)
jwtToken =
  token >>= Token.toString
    >>> Jwt.decode
    >>> either (TokenDecoding >>> throwError) pure
