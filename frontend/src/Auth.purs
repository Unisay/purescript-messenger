module Auth where

import Prelude

import Control.Monad.Reader (class MonadAsk)
import Data.Auth.Token as Auth
import Data.Auth.Token as Token
import Data.Either (hush)
import Data.Maybe (Maybe(..))
import Data.Route (Route(..), goTo)
import Effect.Class (class MonadEffect)
import LocalStorage (HasStorage)
import LocalStorage as Storage

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
setAuth token = Storage.writeKey tokenKey Token.toString token

withAuth
  ∷ ∀ r m
  . MonadEffect m
  ⇒ MonadAsk { | HasStorage r } m
  ⇒ (Auth.Token → m Unit)
  → m Unit
withAuth cb = getAuth >>= case _ of
  Nothing → goTo SignIn
  Just token → cb token
