module Component.Router where

import Prelude

import Component.Home as Home
import Component.Signin as Signin
import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Data.Route (Route(..))
import Data.Route as Route
import Effect.Aff.Class (class MonadAff)
import Effect.Class (class MonadEffect, liftEffect)
import Effect.Class.Console (log)
import Halogen.Extended as H
import Halogen.HTML as HH
import Routing.Duplex as RD
import Routing.Hash (getHash, setHash)
import Type.Proxy (Proxy(..))

data Query a = Navigate Route a

type State = { route :: Maybe Route }

data Action = Initialize

type ChildSlots =
  ( home :: H.OpaqueSlot Unit
  , signin :: H.OpaqueSlot Unit
  , navigation :: H.OpaqueSlot Unit
  )

component :: forall m. MonadAff m => H.Component Query Unit Void m
component = H.mkComponent
  { initialState
  , render
  , eval: H.mkEval $ H.defaultEval
      { handleAction = handleAction
      , handleQuery = handleQuery
      , initialize = Just Initialize
      }
  }

initialState :: forall input. input -> State
initialState _input = { route: Nothing }

handleAction
  :: forall m
   . MonadEffect m
  => Action
  -> H.HalogenM State Action ChildSlots Void m Unit
handleAction Initialize = do
  route <- liftEffect getHash >>= \hash -> do
    case RD.parse Route.codec hash of
      Left err -> log (show err <> ": " <> show hash) $> Home
      Right route -> pure route
  navigate route

handleQuery
  :: forall a m
   . MonadEffect m
  => Query a
  -> H.HalogenM State Action ChildSlots Void m (Maybe a)
handleQuery (Navigate dest a) = navigate dest $> Just a

navigate
  :: forall m
   . MonadEffect m
  => Route
  -> H.HalogenM State Action ChildSlots Void m Unit
navigate r = do
  liftEffect $ setHash $ RD.print Route.codec r
  H.put { route: Just r }

render
  :: forall m action
   . MonadAff m
  => State
  -> H.ComponentHTML action ChildSlots m
render { route } = HH.div_
  [ -- display navigation component in the slot
    -- HH.slot_ (Proxy :: _ "navigation") unit Navigation.component unit,
    -- then display one of the children
    case route of
      Nothing ->
        HH.div_ [ HH.text "Oh no! That page wasn't found." ]
      Just r -> case r of
        Home ->
          HH.slot_ (Proxy :: _ "home") unit Home.component unit
        SignIn ->
          HH.slot_ (Proxy :: _ "signin") unit Signin.component unit
        SignUp ->
          HH.slot_ (Proxy :: _ "signin") unit Signin.component unit
        Profile _username ->
          HH.slot_ (Proxy :: _ "signin") unit Signin.component unit
  ]
