module Component.Notifications where

import Prelude

import Data.Array ((:))
import Data.Array as Array
import Data.Foldable (traverse_)
import Data.Maybe (Maybe(..), fromMaybe)
import Data.Notification (Importance(..), Notification(..))
import Effect.Class (class MonadEffect)
import Halogen.Component as HC
import Halogen.Extended as H
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties.Extended as HP
import Halogen.Query as HQ
import Halogen.Subscription as HS
import Svg.Renderer.Halogen (icon)

type Input = HS.Emitter Notification

type State =
  { emitter ∷ HS.Emitter Action
  , subscription ∷ Maybe HQ.SubscriptionId
  , queue ∷ Array Notification
  }

type Slots ∷ ∀ k. Row k
type Slots = ()

data Action = Initialize | Finalize | Notify Notification | Close Int

component ∷ ∀ q m o. MonadEffect m ⇒ H.Component q Input o m
component = H.mkComponent 
  { initialState, render, eval: H.mkEval evalSpec }

evalSpec ∷ ∀ q m o. HC.EvalSpec State q Action Slots Input o m
evalSpec = H.defaultEval
  { initialize = Just Initialize
  , finalize = Just Finalize
  , handleAction = handleAction
  }

initialState ∷ Input → State
initialState emitter =
  { emitter: Notify <$> emitter
  , subscription: Nothing
  , queue: []
  }

render ∷ ∀ m. State → HH.ComponentHTML Action () m
render { queue } =
  HH.div
    [ HP.classNames [ "fixed", "flex", "flex-col", "w-full", "items-center" ]
    ]
    [ HH.ul [ HP.classNames [ "w-4/6" ] ] $
        Array.mapWithIndex renderNotification queue
    ]
  where
  renderNotification ∷ Int → Notification → HH.ComponentHTML Action () m
  renderNotification idx (Notification importance message) =
    HH.li
      [ HP.classNames
          [ importanceColor importance
          , "z-1"
          , "p-2"
          , "m-2"
          , "rounded"
          , "text-white"
          , "flex"
          , "flex-row"
          , "justify-between"
          ]
      ]
      [ HH.span_ [ HH.text $ show (idx + 1) <> ". " <> message ]
      , HH.button [ HE.onClick \_ → Close idx ] [ iconClose [] ]
      ]

  importanceColor ∷ Importance → String
  importanceColor = case _ of
    Useful → "bg-green-600/75"
    Important → "bg-orange-600/75"
    Critical → "bg-red-600/75"

handleAction ∷ ∀ o m. Action → H.HalogenM State Action () o m Unit
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
  Close idx →
    H.modify_ \s@{ queue } → s
      { queue = fromMaybe queue (Array.deleteAt idx queue) }

type Icon = ∀ p r i. Array (HH.IProp r i) → HH.HTML p i

iconClose ∷ Icon
iconClose = icon
  """<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>"""
