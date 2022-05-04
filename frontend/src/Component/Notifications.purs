module Component.Notifications where

import Preamble

import Config (Config)
import Control.Monad.Reader.Class (class MonadAsk, asks)
import Control.Monad.State.Class (class MonadState, gets)
import Control.Monad.Trans.Class (lift)
import Data.Array ((:))
import Data.Array as Array
import Data.Foldable (traverse_)
import Data.Notification (Importance(..), Notification(..))
import Effect.Aff (Milliseconds(..), delay)
import Effect.Aff.Class (class MonadAff, liftAff)
import Halogen.Component as HC
import Halogen.Extended as H
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties.Extended as HP
import Halogen.Query as HQ
import Halogen.Subscription as HS
import Svg.Renderer.Halogen (icon)

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
        , "w-full"
        , "items-center"
        , "z-10"
        ]
    ]
    [ HH.ul [ HP.classNames [ "w-2/3" ] ] $ renderNotification <$> queue ]
  where
  renderNotification
    ∷ ActiveNotification → HH.ComponentHTML Action () m
  renderNotification { id, value: Notification importance message } =
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
      [ HH.span
          [ HP.classNames
              [ "flex"
              , "flex-row"
              , "gap-2"
              ]
          ]
          [ importanceIcon importance [], HH.text message ]
      , HH.button [ HE.onClick \_ → Close id ] [ iconClose [] ]
      ]

  importanceColor ∷ Importance → String
  importanceColor = case _ of
    Useful → "bg-green-600/75"
    Important → "bg-orange-600/75"
    Critical → "bg-red-600/75"

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
    H.modify_ \s@{ queue } → s { queue = activeNotification : queue }
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

type Icon = ∀ p r i. Array (HH.IProp r i) → HH.HTML p i

iconClose ∷ Icon
iconClose = icon
  """<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
  viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round"
  stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"
  /></svg>"""

importanceIcon ∷ Importance → Icon
importanceIcon = case _ of
  Useful →
    icon
      """<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>"""
  Important →
    icon
      """<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667
      1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464
      0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>"""
  Critical →
    icon
      """<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
      viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round"
      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5
      16.09 5.777 17.656 7.343A7.975 7.975 0 0120
      13a7.975 7.975 0 01-2.343 5.657z" />
      <path stroke-linecap="round" stroke-linejoin="round"
      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
    </svg>"""

importanceTimeout ∷ Importance → Milliseconds
importanceTimeout = Milliseconds <<< case _ of
  Useful → 3000.0
  Important → 6000.0
  Critical → 9000.0
