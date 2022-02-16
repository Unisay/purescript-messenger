module Component.Router
  ( component
  , Query(..)
  ) where

import Prelude

import Component.Home as Home
import Component.Navigation as Navigation
import Component.Signin as Signin
import Component.Signup as Signup
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

type State = { route ∷ Route }

data Action = Initialize

type ChildSlots =
  ( home ∷ H.OpaqueSlot Unit
  , signin ∷ H.OpaqueSlot Unit
  , signup ∷ H.OpaqueSlot Unit
  )

component ∷ ∀ m. MonadAff m ⇒ H.Component Query Unit Void m
component = H.mkComponent
  { initialState
  , render
  , eval: H.mkEval $ H.defaultEval
      { handleAction = handleAction
      , handleQuery = handleQuery
      , initialize = Just Initialize
      }
  }

initialState ∷ ∀ input. input → State
initialState _input = { route: Home }

handleAction
  ∷ ∀ m
  . MonadEffect m
  ⇒ Action
  → H.HalogenM State Action ChildSlots Void m Unit
handleAction Initialize = do
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
  H.put { route }

render ∷ ∀ m a. MonadAff m ⇒ State → H.ComponentHTML a ChildSlots m
render { route } = HH.div_
  [ Navigation.render route
  , case route of
      Home →
        HH.slot_ (Proxy ∷ Proxy "home") unit Home.component unit
      SignIn →
        HH.slot_ (Proxy ∷ Proxy "signin") unit Signin.component ?notifications
      SignUp →
        HH.slot_ (Proxy ∷ Proxy "signup") unit Signup.component unit
      Profile _username →
        HH.slot_ (Proxy ∷ Proxy "signin") unit Signin.component ?notifications
  ]
