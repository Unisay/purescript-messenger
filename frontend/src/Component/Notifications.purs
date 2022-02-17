module Component.Notifications where

import Prelude

import Data.Foldable (traverse_)
import Data.Maybe (Maybe(..))
import Data.Notification (Notification)
import Effect.Class (class MonadEffect, liftEffect)
import Effect.Class.Console (logShow)
import Halogen.Extended as H
import Halogen.HTML as HH
import Halogen.Subscription as HS

type Input = HS.Emitter Notification

type State =
  { emitter ∷ Input
  , subscription ∷ Maybe HS.Subscription
  , queue ∷ Array Notification
  }

data Action = Initialize | Finalize

component ∷ ∀ q m o. MonadEffect m ⇒ H.Component q Input o m
component = H.mkComponent
  { initialState
  , render
  , eval: H.mkEval $ H.defaultEval
      { initialize = Just Initialize
      , finalize = Just Finalize
      , handleAction = handleAction
      }
  }
  where
  initialState ∷ Input → State
  initialState emitter =
    { emitter
    , subscription: Nothing
    , queue: []
    }

  render ∷ State → HH.ComponentHTML Action () m
  render { queue } =
    HH.ul_ $ queue <#> \notification →
      HH.li_ [ HH.text $ show notification ]

  handleAction ∷ Action → H.HalogenM State Action () o m Unit
  handleAction = case _ of
    Initialize → do
      { emitter } ← H.get
      subscription ← liftEffect $ HS.subscribe emitter \notification →
        -- H.modify_ \s@{ queue } → s { queue = notification : queue }
        logShow notification
      H.modify_ _ { subscription = Just subscription }
    Finalize → do
      s ← H.gets _.subscription
      liftEffect $ traverse_ HS.unsubscribe s
