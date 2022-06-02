module Component.Router
  ( component
  , Query(..)
  ) where

import Preamble

import AppM (App)
import AppM as App
import Auth as Auth
import Backend as Backend
import Component.Chat as Chat
import Component.Debug as Debug
import Component.Error as Error
import Component.Home as Home
import Component.Navigation (Output(..))
import Component.Navigation as Navigation
import Component.Notifications as Notifications
import Component.Signin as Signin
import Component.Signup as Signup
import Config (Config)
import Control.Monad.Except (runExceptT)
import Control.Monad.Reader (runReaderT)
import Data.Route (Route(..), goTo)
import Data.Route as Route
import Effect.Aff (Aff)
import Halogen.Component as HC
import Halogen.Extended as H
import Halogen.HTML as HH
import Halogen.HTML.Properties.Extended as HP
import Routing.Duplex as RD
import Routing.Hash (getHash, setHash)
import Type.Proxy (Proxy(..))

data Query a = Navigate Route a

type State =
  { config ∷ Config
  , route ∷ Route
  , authInfo ∷ Maybe Auth.Info
  , error ∷ Maybe App.Error
  }

data Action
  = Initialize
  | RecordAppError App.Error
  | ErrorAction Error.Output
  | SigninOutput Signin.Output
  | NavigationOutput Navigation.Output

type ChildSlots =
  ( notifications ∷ H.OpaqueSlot Unit
  , navigation ∷ ∀ query. H.Slot query Navigation.Output Int
  , home ∷ ∀ query. H.Slot query App.Error Int
  , signin ∷ ∀ query. H.Slot query Signin.Output Int
  , signup ∷ ∀ query. H.Slot query Backend.Error Int
  , profile ∷ ∀ query. H.Slot query Signin.Output Int
  , debug ∷ H.OpaqueSlot Unit
  , chat ∷ ∀ query. H.Slot query Backend.Error Int
  , error ∷ ∀ query. H.Slot query Error.Output Int
  )

_notifications = Proxy ∷ Proxy "notifications"
_navigation = Proxy ∷ Proxy "navigation"
_home = Proxy ∷ Proxy "home"
_signin = Proxy ∷ Proxy "signin"
_signup = Proxy ∷ Proxy "signup"
_profile = Proxy ∷ Proxy "profile"
_debug = Proxy ∷ Proxy "debug"
_error = Proxy ∷ Proxy "error"
_chat = Proxy ∷ Proxy "chat"

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
  , authInfo: Nothing
  , error: Nothing
  }

handleAction
  ∷ ∀ m
  . MonadEffect m
  ⇒ Action
  → H.HalogenM State Action ChildSlots Void m Unit
handleAction = case _ of
  Initialize → do
    runExceptT (H.gets _.config >>= runReaderT Auth.loadInfo) >>= case _ of
      Left err → handleAction $ RecordAppError $ App.AuthError err
      Right info → H.modify_ _ { authInfo = info }
    -- Route handling:
    route ← liftEffect getHash >>= \hash → do
      case RD.parse Route.codec hash of
        Left err → log (show err <> ": " <> show hash) $> Home
        Right route → pure route
    navigate route
  RecordAppError err → do
    logShow err
    H.modify_ _ { error = Just err }
  ErrorAction action → do
    case action of
      Error.Retry → do
        H.modify_ _ { error = Nothing }
      Error.SignIn → do
        H.gets _.config >>= runReaderT Auth.removeToken
        H.modify_ _ { error = Nothing, authInfo = Nothing }
        goTo Route.SignIn
  SigninOutput signinOut → case signinOut of
    Left err →
      handleAction $ RecordAppError $ App.BackendError err
    Right token →
      runExceptT (Auth.decodeToken token) >>= case _ of
        Left err →
          handleAction $ RecordAppError $ App.AuthError err
        Right info → H.modify_ _ { authInfo = Just info }
  NavigationOutput output → case output of
    OutputError err → handleAction $ RecordAppError err
    SignedOut → H.modify_ _ { authInfo = Nothing } *> goTo Route.Home

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
render { config, route, authInfo, error } =
  HH.div [ HP.classNames [ "flex", "flex-col", "min-h-screen" ] ]
    case error of
      Nothing →
        [ slotNotifications
        , slotNavigation
        , case route of
            Home → slotHome
            SignIn → slotSignin
            SignUp → slotSignup
            Profile _username → slotProfile
            Debug → slotDebug
            Chat →
              case authInfo of
                Just info → slotChat info
                Nothing → slotSignin
        ]
        where
        hoistApp ∷ ∀ q i o. H.Component q i o App → H.Component q i o Aff
        hoistApp = HC.hoist (App.run config)
        slotNotifications =
          HH.slot_ _notifications unit (hoistApp Notifications.component) unit
        slotNavigation =
          HH.slot _navigation 0 (hoistApp Navigation.component)
            { route, authInfo }
            NavigationOutput
        slotSignin =
          HH.slot _signin 1 (hoistApp Signin.component) unit SigninOutput
        slotSignup =
          HH.slot _signup 2 (hoistApp Signup.component) unit
            (RecordAppError <<< App.BackendError)
        slotProfile =
          HH.slot _profile 3 (hoistApp Signin.component) unit SigninOutput
        slotDebug =
          HH.slot_ _debug unit (hoistApp Debug.component) unit
        slotChat info =
          HH.slot _chat 4 (hoistApp Chat.component) info
            (RecordAppError <<< App.BackendError)
        slotHome =
          HH.slot _home 5 (hoistApp Home.component) { authInfo } RecordAppError
      Just err →
        [ HH.slot _error 6 Error.component err ErrorAction ]

