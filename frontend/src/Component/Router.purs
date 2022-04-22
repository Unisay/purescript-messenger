module Component.Router
  ( component
  , Query(..)
  ) where

import Preamble

import AppM (App)
import AppM as App
import Component.ChatWindow as ChatWindow
import Component.Debug as Debug
import Component.Error as Error
import Component.Home as Home
import Component.Navigation as Navigation
import Component.Notifications as Notifications
import Component.Signin as Signin
import Component.Signup as Signup
import Config (Config)
import Data.Functor.Contravariant ((>$<))
import Data.Route (Route(..))
import Data.Route as Route
import Effect.Aff (Aff)
import Effect.Class (class MonadEffect, liftEffect)
import Halogen.Component as HC
import Halogen.Extended as H
import Halogen.HTML as HH
import Halogen.Query as HQ
import Halogen.Subscription as HS
import Routing.Duplex as RD
import Routing.Hash (getHash, setHash)
import Type.Proxy (Proxy(..))
import Unsafe.Coerce (unsafeCoerce)

data Query a = Navigate Route a

type State =
  { config ∷ Config
  , route ∷ Route
  , error ∷ Maybe App.Error
  , errorListener ∷ HS.Listener App.Error
  }

data Action = Initialize | SetError App.Error | HandleButton Error.Output

type ChildSlots =
  ( notifications ∷ H.OpaqueSlot Unit
  , home ∷ H.OpaqueSlot Unit
  , navigation ∷ H.OpaqueSlot Unit
  , signin ∷ H.OpaqueSlot Unit
  , signup ∷ H.OpaqueSlot Unit
  , profile ∷ H.OpaqueSlot Unit
  , debug ∷ H.OpaqueSlot Unit
  , chatWindow ∷ H.OpaqueSlot Unit
  , error ∷ H.OpaqueSlot Unit
  , button ∷ ∀ query. H.Slot query Error.Output Int
  )

component ∷ H.Component Query Config Void Aff
component = H.mkComponent
  { initialState
  , render
  , eval: H.mkEval $ H.defaultEval
      { handleAction = handleAction
      , handleQuery = handleQuery
      , initialize = Just Initialize
      }
  }

initialState ∷ Config → State
initialState config =
  { config
  , route: Home
  , error: Nothing
  , errorListener: unsafeCoerce (\(_ ∷ App.Error) → pure unit ∷ Effect Unit)
  }

handleAction
  ∷ ∀ m
  . MonadEffect m
  ⇒ Action
  → H.HalogenM State Action ChildSlots Void m Unit
handleAction = case _ of
  Initialize → do
    -- Exception handling:
    exceptions ← liftEffect HS.create
    _subId ← HQ.subscribe exceptions.emitter
    H.modify_ _ { errorListener = SetError >$< exceptions.listener }
    -- Route handling:
    route ← liftEffect getHash >>= \hash → do
      case RD.parse Route.codec hash of
        Left err → log (show err <> ": " <> show hash) $> Home
        Right route → pure route
    navigate route
  SetError err → H.modify_ _ { error = Just err }
  HandleButton output → case output of
    Error.Clicked → H.modify_ _ { error = Nothing }

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

render ∷ State → H.ComponentHTML Action ChildSlots Aff
render { config, route, error, errorListener } =
  HH.div_ case error of
    Nothing →
      [ slotNotifications
      , slotNavigation
      , case route of
          Home → slotHome
          SignIn → slotSignin
          SignUp → slotSignup
          Profile _username → slotProfile
          Debug → slotDebug
          ChatWindow → slotChatWindow
      ]
      where
      hoistApp ∷ ∀ q i o. H.Component q i o App → H.Component q i o Aff
      hoistApp = HC.hoist (App.run config errorListener)
      slotNotifications =
        HH.slot_ (Proxy ∷ _ "notifications") unit comp unit
        where
        comp = hoistApp Notifications.component
      slotHome =
        HH.slot_ (Proxy ∷ _ "home") unit Home.component unit
      slotNavigation =
        HH.slot_ (Proxy ∷ _ "navigation") unit
          (hoistApp Navigation.component)
          route
      slotSignin =
        HH.slot_ (Proxy ∷ _ "signin") unit (hoistApp Signin.component) unit
      slotSignup =
        HH.slot_ (Proxy ∷ _ "signup") unit (hoistApp Signup.component) unit
      slotProfile =
        HH.slot_ (Proxy ∷ _ "profile") unit (hoistApp Signin.component) unit
      slotDebug =
        HH.slot_ (Proxy ∷ _ "debug") unit (hoistApp Debug.component) unit
      slotChatWindow =
        HH.slot_ (Proxy ∷ _ "chatWindow") unit
          (hoistApp ChatWindow.component)
          unit
    Just err →
      [ HH.slot (Proxy ∷ _ "button") 0 Error.component err HandleButton ]

