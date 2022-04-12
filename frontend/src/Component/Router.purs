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
import Config (App)
import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Data.Route (Route(..))
import Data.Route as Route
import Effect.Class (class MonadEffect, liftEffect)
import Effect.Class.Console (log)
import Halogen.Extended as H
import Halogen.HTML as HH
import Routing.Duplex as RD
import Routing.Hash (getHash, setHash)
import Type.Proxy (Proxy(..))

data Query a = Navigate Route a

type State = { route ∷ Route }

data Action = Initialize

type ChildSlots =
  ( notifications ∷ H.OpaqueSlot Unit
  , home ∷ H.OpaqueSlot Unit
  , signin ∷ H.OpaqueSlot Unit
  , signup ∷ H.OpaqueSlot Unit
  , debug ∷ H.OpaqueSlot Unit
  , chatWindow ∷ H.OpaqueSlot Unit
  )

component ∷ ∀ i. H.Component Query i Void App
component = H.mkComponent
  { initialState
  , render
  , eval: H.mkEval $ H.defaultEval
      { handleAction = handleAction
      , handleQuery = handleQuery
      , initialize = Just Initialize
      }
  }

initialState ∷ ∀ i. i → State
initialState _ = { route: Home }

handleAction
  ∷ ∀ m
  . MonadEffect m
  ⇒ Action
  → H.HalogenM State Action ChildSlots Void m Unit
handleAction = case _ of
  Initialize → do
    route ← liftEffect getHash >>= \hash → do
      case RD.parse Route.codec hash of
        Left err → log (show err <> ": " <> show hash) $> Home
        Right route → pure route
    navigate route

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

render ∷ ∀ a. State → H.ComponentHTML a ChildSlots App
render { route } = HH.div_
  [ HH.slot_ (Proxy ∷ _ "notifications") unit Notifications.component unit
  , Navigation.render route
  , case route of
      Home →
        HH.slot_ (Proxy ∷ _ "home") unit Home.component unit
      SignIn →
        HH.slot_ (Proxy ∷ _ "signin") unit Signin.component unit
      SignUp →
        HH.slot_ (Proxy ∷ _ "signup") unit Signup.component unit
      Profile _username →
        HH.slot_ (Proxy ∷ _ "signin") unit Signin.component unit
      Debug →
        HH.slot_ (Proxy ∷ _ "debug") unit Debug.component unit
      ChatWindow →
        HH.slot_ (Proxy ∷ _ "chatWindow") unit ChatWindow.component unit
  ]
