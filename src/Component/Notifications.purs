module Component.Notifications where

import Preamble

import Config (Config)
import Control.Monad.Reader.Class (class MonadAsk, asks)
import Control.Monad.State.Class (class MonadState, gets)
import Control.Monad.Trans.Class (lift)
import Data.Array as Array
import Data.Foldable (traverse_)
import Data.Notification (Importance(..), Notification(..))
import Effect.Aff (Milliseconds(..), delay)
import Effect.Aff.Class (class MonadAff, liftAff)
import Halogen.Component as HC
import Halogen.Extended as H
import Halogen.HTML (HTML)
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties.Extended as HP
import Halogen.Query as HQ
import Halogen.Subscription as HS

type State =
  { subscription ∷ Maybe HQ.SubscriptionId
  , queue ∷ Array ActiveNotification
  , currentNotificationId ∷ Int
  }

type Slots ∷ ∀ k. Row k
type Slots = ()

type HasNotifications r = (notifications ∷ HS.SubscribeIO Notification | r)
type NotificationId = Int
type ActiveNotification = { id ∷ NotificationId, value ∷ Notification }

data Action
  = Initialize
  | Finalize
  | Notify Notification
  | Close NotificationId

component ∷ ∀ q m o i. MonadAff m ⇒ MonadAsk Config m ⇒ H.Component q i o m
component = H.mkComponent { initialState, render, eval: H.mkEval evalSpec }

evalSpec
  ∷ ∀ q m o i c
  . MonadAff m
  ⇒ MonadAsk (Record (HasNotifications c)) m
  ⇒ HC.EvalSpec State q Action Slots i o m
evalSpec = H.defaultEval
  { initialize = Just Initialize
  , finalize = Just Finalize
  , handleAction = handleAction
  }

initialState ∷ ∀ i. i → State
initialState _ =
  { subscription: Nothing
  , queue: []
  , currentNotificationId: 0
  }

render ∷ ∀ m. State → HH.ComponentHTML Action () m
render { queue } =
  HH.div
    [ HP.classNames
        [ "fixed"
        , "flex"
        , "flex-col"
        , "w-1/2"
        , "items-center"
        , "z-10"
        , "m-auto"
        , "mt-2"
        , "left-0"
        , "right-0"
        ]
    ]
    [ HH.ul [ HP.classNames [ "w-full", "space-y-2" ] ]
        $ renderNotification
        <$> queue
    ]
  where
  renderNotification
    ∷ ActiveNotification → HH.ComponentHTML Action () m
  renderNotification { id, value: Notification importance message } =
    HH.li_
      [ HH.div
          [ HP.id ("notification" <> show id)
          , HP.classNames
              [ "flex"
              , "p-2"
              , "gap-2"
              , "w-full"
              , "rounded"
              , "text-white"
              , "justify-between"
              , importanceColor importance
              , animate importance
              ]
          ]
          [ HH.div [ HP.classNames [ "flex" ] ]
              [ importanceIcon importance
              , HH.p [ HP.classNames [ "ml-1" ] ] [ HH.text message ]
              ]
          , HH.button [ HE.onClick \_ → Close id ]
              [ HH.img
                  [ HP.src "images/close.svg", HP.classNames [ "h-6", "w-6" ] ]
              ]
          ]
      ]

  importanceColor ∷ Importance → String
  importanceColor = case _ of
    Useful → "bg-green-600/75"
    Important → "bg-orange-600/75"
    Critical → "bg-red-600/75"

  animate ∷ Importance → String
  animate = case _ of
    Useful → "animate-disappear-useful"
    Important → "animate-disappear-important"
    Critical → "animate-disappear-critical"

handleAction
  ∷ ∀ o m c
  . MonadAsk (Record (HasNotifications c)) m
  ⇒ MonadAff m
  ⇒ Action
  → H.HalogenM State Action () o m Unit
handleAction = case _ of
  Initialize → do
    emitter ← lift $ asks _.notifications.emitter
    subscriptionId ← HQ.subscribe $ Notify <$> emitter
    H.modify_ _ { subscription = Just subscriptionId }
  Finalize → do
    s ← H.gets _.subscription
    traverse_ HQ.unsubscribe s
  Notify notification@(Notification importance _) → do
    activeNotification ← makeActive notification
    H.modify_ \s@{ queue } → s { queue = Array.snoc queue activeNotification }
    liftAff $ delay $ importanceTimeout importance
    handleAction (Close activeNotification.id)
  Close notificationId →
    H.modify_ \s@{ queue } → s
      { queue = Array.filter (_.id >>> notEq notificationId) queue }

makeActive ∷ ∀ m. MonadState State m ⇒ Notification → m ActiveNotification
makeActive value = do
  id ← gets _.currentNotificationId
  H.modify_ _ { currentNotificationId = id + 1 }
  pure { id, value }

importanceIcon ∷ ∀ w i. Importance → HTML w i
importanceIcon importance = HH.img case importance of
  Useful → [ HP.src "images/useful.svg", HP.classNames [ "h-6", "w-6" ] ]
  Important → [ HP.src "images/important.svg", HP.classNames [ "h-6", "w-6" ] ]
  Critical → [ HP.src "images/critical.svg", HP.classNames [ "h-6", "w-6" ] ]

importanceTimeout ∷ Importance → Milliseconds
importanceTimeout = Milliseconds <<< case _ of
  Useful → 3000.0
  Important → 6000.0
  Critical → 9000.0
