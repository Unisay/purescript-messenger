module Component.Router
  ( component
  , Query(..)
  ) where

import Preamble

import AppM (App)
import AppM as App
import Auth as Auth
import Backend as Backend
import Component.ChatWindow as ChatWindow
import Component.Debug as Debug
import Component.Error as Error
import Component.Home as Home
import Component.Navigation as Navigation
import Component.Notifications as Notifications
import Component.Signin as Signin
import Component.Signup as Signup
import Config (Config)
import Control.Monad.Reader (runReaderT)
import Data.Route (Route(..), goTo)
import Data.Route as Route
import Effect.Aff (Aff)
import Effect.Class (class MonadEffect, liftEffect)
import Halogen.Component as HC
import Halogen.Extended as H
import Halogen.HTML as HH
import Routing.Duplex as RD
import Routing.Hash (getHash, setHash)
import Type.Proxy (Proxy(..))

data Query a = Navigate Route a

type State =
  { config ∷ Config
  , route ∷ Route
  , error ∷ Maybe App.Error
  }

data Action
  = Initialize
  | RecordAppError App.Error
  | ErrorAction Error.Output
  | SigninOutput Signin.Output

type ChildSlots =
  ( notifications ∷ H.OpaqueSlot Unit
  , navigation ∷ ∀ query. H.Slot query App.Error Int
  , signin ∷ ∀ query. H.Slot query Signin.Output Int
  , signup ∷ ∀ query. H.Slot query Backend.Error Int
  , profile ∷ ∀ query. H.Slot query Signin.Output Int
  , debug ∷ H.OpaqueSlot Unit
  , chatWindow ∷ ∀ query. H.Slot query Backend.Error Int
  , error ∷ ∀ query. H.Slot query Error.Output Int
  , home ∷ ∀ query. H.Slot query App.Error Int
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
  }

handleAction
  ∷ ∀ m
  . MonadEffect m
  ⇒ Action
  → H.HalogenM State Action ChildSlots Void m Unit
handleAction = case _ of
  Initialize → do
    -- Route handling:
    route ← liftEffect getHash >>= \hash → do
      case RD.parse Route.codec hash of
        Left err → log (show err <> ": " <> show hash) $> Home
        Right route → pure route
    navigate route
  RecordAppError err → do
    log $ "Setting error: " <> show err
    H.modify_ _ { error = Just err }
  ErrorAction action → do
    case action of
      Error.Retry → do
        H.modify_ _ { error = Nothing }
      Error.SignIn → do
        H.gets _.config >>= runReaderT Auth.remove
        H.modify_ _ { error = Nothing }
        goTo Route.SignIn
  SigninOutput (Left backendError) →
    handleAction $ RecordAppError $ App.BackendError backendError
  SigninOutput (Right token) →
    ?handle

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
render { config, route, error } =
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
      hoistApp = HC.hoist (App.run config)
      slotNotifications =
        HH.slot_ (Proxy ∷ _ "notifications") unit
          (hoistApp Notifications.component)
          unit
      slotNavigation =
        HH.slot (Proxy ∷ _ "navigation") 0
          (hoistApp Navigation.component)
          route
          RecordAppError
      slotSignin =
        HH.slot (Proxy ∷ _ "signin") 1 (hoistApp Signin.component) unit
          SigninOutput
      slotSignup =
        HH.slot (Proxy ∷ _ "signup") 2 (hoistApp Signup.component) unit
          (RecordAppError <<< App.BackendError)
      slotProfile =
        HH.slot (Proxy ∷ _ "profile") 3 (hoistApp Signin.component) unit
          SigninOutput
      slotDebug =
        HH.slot_ (Proxy ∷ _ "debug") unit (hoistApp Debug.component) unit
      slotChatWindow =
        HH.slot (Proxy ∷ _ "chatWindow") 4 (hoistApp ChatWindow.component) unit
          (RecordAppError <<< App.BackendError)
      slotHome =
        HH.slot (Proxy ∷ _ "home") 5 (hoistApp Home.component) unit
          RecordAppError
    Just err →
      [ HH.slot (Proxy ∷ _ "error") 6 Error.component err ErrorAction ]

