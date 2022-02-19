module Component.Notifications where

import Prelude

import Data.Array ((:))
import Data.Foldable (traverse_)
import Data.Maybe (Maybe(..))
import Data.Notification (Importance(..), Notification(..))
import Effect.Class (class MonadEffect)
import Halogen.Extended as H
import Halogen.HTML as HH
import Halogen.HTML.Properties.Extended as HP
import Halogen.Query as HQ
import Halogen.Subscription as HS

type Input = HS.Emitter Notification

type State =
  { emitter ∷ HS.Emitter Action
  , subscription ∷ Maybe HQ.SubscriptionId
  , queue ∷ Array Notification
  }

data Action = Initialize | Finalize | Notify Notification

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
    { emitter: Notify <$> emitter
    , subscription: Nothing
    , queue: []
    }

  render ∷ State → HH.ComponentHTML Action () m
  render { queue } =
    HH.div
      [ HP.classNames
          [ "fixed", "flex", "flex-col", "w-full", "items-center" ]
      ]
      [ HH.ul [ HP.classNames [ "w-5/6" ] ] $ queue <#> case _ of
          Notification importance message →
            HH.li
              [ HP.classNames
                  [ importanceColor importance
                  , "p-1"
                  , "m-2"
                  , "rounded"
                  ]
              ]
              [ HH.text message ]
      ]
    where
    importanceColor ∷ Importance → String
    importanceColor = case _ of
      Useful → "bg-green-500"
      Important → "bg-orange-500"
      Critical → "bg-red-500"

  handleAction ∷ Action → H.HalogenM State Action () o m Unit
  handleAction = case _ of
    Initialize → do
      { emitter } ← H.get
      subscriptionId ← HQ.subscribe emitter
      H.modify_ _ { subscription = Just subscriptionId }
    Finalize → do
      s ← H.gets _.subscription
      traverse_ HQ.unsubscribe s
    Notify notification →
      H.modify_ \s@{ queue } → s { queue = notification : queue }
