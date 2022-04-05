module Component.Router
  ( component
  , Query(..)
  ) where

import Prelude

import Component.ChatWindow as ChatWindow
import Component.Debug as Debug
import Component.Home as Home
import Component.Navigation as Navigation
import Component.Notifications as Notifications
import Component.Signin as Signin
import Component.Signup as Signup
import Data.Either (Either(..))
import Data.Foldable (for_)
import Data.Maybe (Maybe(..))
import Data.Notification (Notification)
import Data.Route (Route(..))
import Data.Route as Route
import Effect.Aff.Class (class MonadAff)
import Effect.Class (class MonadEffect, liftEffect)
import Effect.Class.Console (log, logShow)
import Halogen.Extended as H
import Halogen.HTML as HH
import Halogen.Subscription as HS
import Routing.Duplex as RD
import Routing.Hash (getHash, setHash)
import Type.Proxy (Proxy(..))

data Query a = Navigate Route a

type State =
  { route ∷ Route
  , notifications ∷ HS.SubscribeIO Notification
  , subscriptions ∷ Array HS.Subscription
  }

data Action = Initialize | Finalize

type Input = HS.SubscribeIO Notification

type ChildSlots =
  ( notifications ∷ H.OpaqueSlot Unit
  , home ∷ H.OpaqueSlot Unit
  , signin ∷ H.OpaqueSlot Unit
  , signup ∷ H.OpaqueSlot Unit
  , debug ∷ H.OpaqueSlot Unit
  , chatWindow ∷ H.OpaqueSlot Unit
  )

component ∷ ∀ m. MonadAff m ⇒ H.Component Query Input Void m
component = H.mkComponent
  { initialState
  , render
  , eval: H.mkEval $ H.defaultEval
      { handleAction = handleAction
      , handleQuery = handleQuery
      , initialize = Just Initialize
      , finalize = Just Finalize
      }
  }

initialState ∷ Input → State
initialState notifications =
  { route: Home
  , notifications
  , subscriptions: []
  }

handleAction
  ∷ ∀ m
  . MonadEffect m
  ⇒ Action
  → H.HalogenM State Action ChildSlots Void m Unit
handleAction = case _ of
  Initialize → do
    { notifications } ← H.get
    subscription ← liftEffect $ HS.subscribe notifications.emitter
      \notification → logShow notification
    H.modify_ _ { subscriptions = [ subscription ] }
    route ← liftEffect getHash >>= \hash → do
      case RD.parse Route.codec hash of
        Left err → log (show err <> ": " <> show hash) $> Home
        Right route → pure route
    navigate route
  Finalize → do
    { subscriptions } ← H.get
    liftEffect $ for_ subscriptions HS.unsubscribe

handleQuery
  ∷ ∀ a m
  . MonadEffect m
  ⇒ Query a
  → H.HalogenM State Action ChildSlots Void m (Maybe a)

handleQuery (Navigate route a) = navigate route $> Just a

navigate
  ∷ ∀ m
  . MonadEffect m
  ⇒ Route
  → H.HalogenM State Action ChildSlots Void m Unit
navigate route = do
  liftEffect $ setHash $ RD.print Route.codec route
  H.modify_ _ { route = route }

render ∷ ∀ m a. MonadAff m ⇒ State → H.ComponentHTML a ChildSlots m
render { route, notifications } = HH.div_
  [ HH.slot_ (Proxy ∷ _ "notifications") unit Notifications.component
      notifications.emitter
  , Navigation.render route
  , case route of
      Home →
        HH.slot_ (Proxy ∷ _ "home") unit Home.component unit
      SignIn →
        HH.slot_ (Proxy ∷ _ "signin") unit Signin.component
          notifications.listener
      SignUp →
        HH.slot_ (Proxy ∷ _ "signup") unit Signup.component unit
      Profile _username →
        HH.slot_ (Proxy ∷ _ "signin") unit Signin.component
          notifications.listener
      Debug → HH.slot_ (Proxy ∷ _ "debug") unit Debug.component
        notifications.listener
      ChatWindow →
        HH.slot_ (Proxy ∷ _ "chatWindow") unit ChatWindow.component unit
  ]
