module Halogen.Driver where

import Prelude

import Control.Applicative.Free (retractFreeAp)
import Control.Monad.Free (foldFree)
import Data.Map (Map)
import Data.Map as Map
import Data.Maybe (Maybe(..))
import Data.Traversable (traverse_)
import Data.Tuple (Tuple(..))
import Effect.Aff (Aff)
import Effect.Aff.Class (liftAff)
import Effect.Class (liftEffect)
import Effect.Ref (Ref)
import Effect.Ref as Ref
import Halogen.Aff.Driver.Eval (handleAff)
import Halogen.Component (EvalSpec)
import Halogen.Query.ChildQuery (unChildQueryBox)
import Halogen.Query.HalogenM
  ( ForkId(..)
  , HalogenAp(..)
  , HalogenF(..)
  , HalogenM(..)
  , SubscriptionId(..)
  )
import Halogen.Subscription (Subscription)
import Halogen.Subscription as HS
import Unsafe.Coerce (unsafeCoerce)

type DriverState state =
  { state ∷ state
  , nextSubscriptionId ∷ SubscriptionId
  , subscriptions ∷ Map SubscriptionId Subscription
  }

runComponent
  ∷ ∀ m query state action slots input output
  . Monad m
  ⇒ state
  → (m ~> Aff)
  → EvalSpec state query action slots input output m
  → ( (action → HalogenM state action slots output m Unit)
      → HalogenM state action slots output m Unit
    )
  → Aff Unit
runComponent state runM { initialize, finalize, handleAction } callback =
  liftAff $ do
    st ← liftEffect $ Ref.new
      { state
      , nextSubscriptionId: SubscriptionId 1
      , subscriptions: Map.empty
      }
    void $ runHalogenM st do
      traverse_ handleAction initialize
      callback handleAction
      traverse_ handleAction finalize

  where

  runHalogenM
    ∷ Ref (DriverState state) → HalogenM state action slots output m ~> Aff
  runHalogenM st (HalogenM freeF) = foldFree go freeF
    where
    go ∷ HalogenF state action slots output m ~> Aff
    go = case _ of
      State f → liftEffect do
        Tuple a s ← Ref.read st <#> (_.state >>> f)
        a <$ Ref.modify_ _ { state = s } st

      Subscribe sidEmitter k → liftEffect do
        { nextSubscriptionId } ← st # Ref.modify
          \s@{ nextSubscriptionId: SubscriptionId sid } →
            s { nextSubscriptionId = SubscriptionId (sid + 1) }

        let emitter = sidEmitter nextSubscriptionId
        subscription ← liftEffect $ HS.subscribe emitter \action →
          handleAff $ runHalogenM st $ handleAction action
        st # Ref.modify_ \s@{ subscriptions } → s
          { subscriptions = Map.insert nextSubscriptionId subscription
              subscriptions
          }
        pure $ k nextSubscriptionId

      Unsubscribe subscriptionId a → liftEffect do
        ds@{ subscriptions } ← Ref.read st
        case Map.pop subscriptionId subscriptions of
          Nothing → pure a
          Just (Tuple subscription subscriptions') → do
            HS.unsubscribe subscription
            Ref.write ds { subscriptions = subscriptions' } st
            pure a

      Lift m → runM m
      ChildQuery cqb → cqb # unChildQueryBox \_ → unsafeCoerce unit
      Raise _output a → pure a
      Par (HalogenAp ap) → runHalogenM st $ retractFreeAp ap
      Fork h k → runHalogenM st h $> k (ForkId 0)
      Kill _forkId a → pure a
      GetRef _refLabel k → pure $ k Nothing
