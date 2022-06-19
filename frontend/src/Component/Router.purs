module Component.Router
  ( component
  , Query(..)
  ) where

import Preamble

import AppM (App)
import AppM as App
import Auth (Info(..))
import Auth as Auth
import Auth0 as Auth0
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
import Network.RemoteData (RemoteData(..))
import Network.RemoteData as RD
import Routing.Duplex as RD
import Routing.Duplex.Parser (RouteError(..))
import Routing.Hash (getHash, setHash)
import Type.Proxy (Proxy(..))

data Query a = Navigate Route a

type State =
  { config ∷ Config
  , route ∷ Route
  , authInfo ∷ RemoteData Unit Auth.Info
  , error ∷ Maybe App.Error
  }

data Action
  = Initialize
  | Finalize
  | RecordAppError App.Error
  | ErrorAction Error.Output
  | NavigationOutput Navigation.Output

type ChildSlots =
  ( notifications ∷ H.OpaqueSlot Unit
  , navigation ∷ ∀ query. H.Slot query Navigation.Output Int
  , home ∷ ∀ query. H.Slot query App.Error Int
  , debug ∷ H.OpaqueSlot Unit
  , chat ∷ ∀ query. H.Slot query Backend.Error Int
  , error ∷ ∀ query. H.Slot query Error.Output Int
  )

_notifications = Proxy ∷ Proxy "notifications"
_navigation = Proxy ∷ Proxy "navigation"
_home = Proxy ∷ Proxy "home"
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
  , authInfo: NotAsked
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
      modify_ _ { authInfo = Loading }
      gets _.config >>= runReaderT Auth.userInfo >>= case _ of
        Left err → recordAppError $ App.AuthError err
        Right (info ∷ Auth.Info) → modify_ _ { authInfo = Success info }
      -- Route handling:
      route ← liftEffect getHash >>= \hash → do
        case RD.parse Route.codec hash of
          Left EndOfPath → pure Home
          Left err → Console.error (show err <> ": " <> show hash) $> Home
          Right route → pure route
      navigate route
    Finalize →
      pass -- TODO
    ErrorAction action → case action of
      Error.Retry → modify_ _ { error = Nothing }
      Error.SignIn → do
        modify_ _ { error = Nothing, authInfo = Failure unit }
        goTo Route.SignIn
    NavigationOutput output →
      case output of
        OutputError err → recordAppError err
        SignedOut → modify_ _ { authInfo = NotAsked } *> goTo Route.Home
    RecordAppError err →
      recordAppError err

  where
  recordAppError err = logShow err *> modify_ _ { error = Just err }

handleQuery
  ∷ ∀ a m
  . MonadEffect m
  ⇒ Query a
  → H.HalogenM State Action ChildSlots Void m (Maybe a)
handleQuery (Navigate route a) = do
  if not (authorized || route is public) then
    Auth0.loginWithRedirect
      { redirect_uri: "https://puremess:8000/" } -- TODO: Config
  else navigate route
  pure $ Just a

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
            Debug → slotDebug
            Chat →
              case authInfo of
                RD.Success (Authenticated info) → slotChat info
                _ → HH.text "Authorization required"
        ]
        where

        hoistApp ∷ ∀ q i o. H.Component q i o App → H.Component q i o Aff
        hoistApp = HC.hoist (App.run config)

        slotNotifications =
          HH.slot_ _notifications unit (hoistApp Notifications.component) unit

        slotNavigation =
          HH.slot _navigation 0 (hoistApp Navigation.component)
            { route, authInfo: RD.toMaybe authInfo }
            NavigationOutput

        slotDebug =
          HH.slot_ _debug unit (hoistApp Debug.component) unit

        slotChat info =
          HH.slot _chat 4 (hoistApp Chat.component) info
            (RecordAppError <<< App.BackendError)

        slotHome =
          HH.slot _home 5 (hoistApp Home.component)
            { authInfo: RD.toMaybe authInfo }
            RecordAppError

      Just err →
        [ HH.slot _error 6 Error.component err ErrorAction ]

