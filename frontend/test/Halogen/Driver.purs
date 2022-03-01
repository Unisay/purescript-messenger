module Halogen.Driver where

import Prelude

import Control.Applicative.Free (retractFreeAp)
import Control.Monad.Free (foldFree)
import Control.Monad.Rec.Class (class MonadRec)
import Control.Monad.State.Class (class MonadState, state)
import Data.Maybe (Maybe(..))
import Halogen (HalogenF(..), HalogenM(..))
import Halogen.Query.ChildQuery (unChildQueryBox)
import Halogen.Query.HalogenM (ForkId(..), HalogenAp(..), SubscriptionId(..))
import Unsafe.Coerce (unsafeCoerce)

runHalogenM
  ∷ ∀ state action slots output m a
  . MonadRec m
  ⇒ MonadState state m
  ⇒ HalogenM state action slots output m a
  → m a
runHalogenM (HalogenM freeHF) = foldFree go freeHF
  where
  go ∷ HalogenF state action slots output m ~> m
  go = case _ of
    State f → state f
    Subscribe _sidEmitter k → pure $ k $ SubscriptionId 0
    Unsubscribe _subscriptionId a → pure a
    Lift m → m
    ChildQuery cqb → cqb # unChildQueryBox \_ → unsafeCoerce unit
    Raise _output a → pure a
    Par (HalogenAp ap) → runHalogenM $ retractFreeAp ap
    Fork hm k → runHalogenM hm $> k (ForkId 0)
    Kill _forkId a → pure a
    GetRef _refLabel k → pure $ k Nothing
