module Config where

import Prelude

import Control.Monad.Reader (class MonadAsk, asks)
import Data.Auth.Token as Auth
import Data.Maybe (Maybe(..))
import Data.Notification (Notification)
import Effect.Class (class MonadEffect, liftEffect)
import Effect.Ref (Ref)
import Effect.Ref as Ref
import Halogen.Subscription (SubscribeIO)

type Config =
  { notifications ∷ SubscribeIO Notification
  , backendApiUrl ∷ String
  , auth ∷ Ref (Maybe Auth.Token)
  }

type HasAuth r = (auth ∷ Ref (Maybe Auth.Token) | r)

getAuth
  ∷ ∀ r m
  . MonadEffect m
  ⇒ MonadAsk (Record (HasAuth r)) m
  ⇒ m (Maybe Auth.Token)
getAuth = do
  r ← asks _.auth
  liftEffect $ Ref.read r

setAuth
  ∷ ∀ r m
  . MonadEffect m
  ⇒ MonadAsk (Record (HasAuth r)) m
  ⇒ Auth.Token
  → m Unit
setAuth token = do
  r ← asks _.auth
  liftEffect $ Ref.write (Just token) r
