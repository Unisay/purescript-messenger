module LocalStorage where

import Prelude

import Control.Monad.Reader (class MonadAsk, asks)
import Data.Maybe (Maybe)
import Effect.Class (class MonadEffect, liftEffect)
import Web.Storage.Storage (Storage, getItem, setItem)

type HasStorage r = (storage ∷ Storage | r)

getStorage ∷ ∀ r m. MonadAsk { | HasStorage r } m ⇒ m Storage
getStorage = asks _.storage

newtype Key ∷ Type → Type
newtype Key a = Key String

type Dec t = String → Maybe t
type Enc t = t → String

readKey
  ∷ ∀ a r m
  . MonadEffect m
  ⇒ MonadAsk { | HasStorage r } m
  ⇒ Key a
  → Dec a
  → m (Maybe a)
readKey (Key k) dec = do
  s ← getStorage
  v ← liftEffect $ getItem k s
  pure $ dec =<< v

writeKey
  ∷ ∀ a r m
  . MonadEffect m
  ⇒ MonadAsk { | HasStorage r } m
  ⇒ Key a
  → Enc a
  → a
  → m Unit
writeKey (Key k) enc v = do
  s ← getStorage
  liftEffect $ setItem k (enc v) s
