module Component.Router
  ( component
  , Query(..)
  ) where

import Preamble

import AppM (App)
import AppM as App
import Auth (Info, decodeToken, loadInfo, removeToken) as Auth
import Backend (deleteSession) as Auth
import Backend as Backend
import Chat.Api.Http (SignoutReason(..))
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
import Control.Monad.Except (ExceptT, runExceptT)
import Control.Monad.Reader (ReaderT, runReaderT)
import Control.Monad.State (class MonadState, gets, modify_)
import Data.Bitraversable (bitraverse_, ltraverse)
import Data.Route (Route(..), goTo)
import Data.Route as Route
import Data.Traversable (traverse_)
import Effect.Aff (Aff)
import Effect.Aff.Class (class MonadAff)
import Effect.Class.Console as Console
import Halogen.Component as HC
import Halogen.Extended as H
import Halogen.HTML as HH
import Halogen.HTML.Properties.Extended as HP
import Routing.Duplex as RD
import Routing.Duplex.Parser (RouteError(..))
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
  | Finalize
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
      , finalize = Just Finalize
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
  . MonadAff m
  ⇒ Action
  → H.HalogenM State Action ChildSlots Void m Unit
handleAction = do
  case _ of
    Initialize → do
      run Auth.loadInfo >>=
        bitraverse_ (recordAppError <<< App.AuthError) \info →
          modify_ _ { authInfo = info }
      -- Route handling:
      route ← liftEffect getHash >>= \hash → do
        case RD.parse Route.codec hash of
          Left EndOfPath → pure Home
          Left err → Console.error (show err <> ": " <> show hash) $> Home
          Right route → pure route
      navigate route
    Finalize →
      gets _.authInfo >>= traverse_ \{ token, username } →
        run (Auth.deleteSession username token UserAction)
          >>= ltraverse (recordAppError <<< App.BackendError)
    ErrorAction action → case action of
      Error.Retry → modify_ _ { error = Nothing }
      Error.SignIn → do
        gets _.config >>= runReaderT Auth.removeToken
        modify_ _ { error = Nothing, authInfo = Nothing }
        goTo Route.SignIn
    SigninOutput signinOut →
      case signinOut of
        Left err → recordAppError $ App.BackendError err
        Right token →
          runExceptT (Auth.decodeToken token) >>=
            bitraverse_ (recordAppError <<< App.AuthError) \info →
              modify_ _ { authInfo = Just info }
    NavigationOutput output →
      case output of
        OutputError err → recordAppError err
        SignedOut → modify_ _ { authInfo = Nothing } *> goTo Route.Home
    RecordAppError err →
      recordAppError err

  where
  run
    ∷ ∀ r e n a
    . MonadAff n
    ⇒ MonadState { config ∷ Config | r } n
    ⇒ ExceptT e (ReaderT Config n) a
    → n (Either e a)
  run n = gets _.config >>= runReaderT (runExceptT n)

  recordAppError err = logShow err *> modify_ _ { error = Just err }

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
  modify_ _ { route = route }

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

