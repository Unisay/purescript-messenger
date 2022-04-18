module Component.ChatWindow where

import Prelude

import AppM (App)
import Backend (HasBackendConfig)
import Backend as Backend
import Chat.Api.Http (UserPresence)
import Chat.Presence (Presence(..))
import Config (HasAuth, getAuth)
import Control.Monad.Except (runExceptT)
import Control.Monad.Reader (class MonadAsk)
import Control.Monad.State (class MonadState)
import Data.Array as Array
import Data.Maybe (Maybe(..))
import Data.Route (goTo)
import Data.Route as Route
import Data.Traversable (traverse_)
import Data.Username as Username
import Effect.Aff.Class (class MonadAff)
import Halogen as H
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP
import Network.RemoteData (RemoteData)
import Network.RemoteData as RD

type State = { users ∷ RemoteData Backend.Error (Array UserPresence) }

data Action = Initialize

component ∷ ∀ q i o. H.Component q i o App
component =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval $ H.defaultEval
        { initialize = Just Initialize
        , handleAction = handleAction
        }
    }

initialState ∷ ∀ i. i → State
initialState _input = { users: RD.NotAsked }

handleAction
  ∷ ∀ r m
  . MonadAff m
  ⇒ MonadState State m
  ⇒ MonadAsk (Record (HasBackendConfig (HasAuth r))) m
  ⇒ Action
  → m Unit
handleAction = case _ of
  Initialize → getAuth >>= case _ of
    Just token → do
      H.modify_ _ { users = RD.Loading }
      users ← runExceptT (Backend.listUsers token) <#> RD.fromEither
      H.modify_ _ { users = users }
    Nothing →
      goTo Route.SignIn

render ∷ ∀ m a. State → H.ComponentHTML a () m
render { users } = HH.div
  [ HP.classNames
      [ "flex"
      , "flex-col"
      , "h-min"
      , "w-1/5"
      , "float-right"
      , "bg-slate-200"
      , "opacity-90"
      ]
  ]
  [ HH.ul [ HP.classNames [ "w-full", "p-2" ] ] $
      renderUsers <$> Array.sortWith _.presence (RD.withDefault [] users)
  ]
  where
  renderUsers ∷ UserPresence → HH.ComponentHTML a () m
  renderUsers st =
    HH.li
      [ HP.classNames [ "flex", "flex-row" ] ]
      [ HH.section
          [ HP.classNames
              [ "flex"
              , "flex-row"
              , "h-fit"
              , "items-center"
              ]
          ] $
          ( if st.presence == Online then
              [ HH.div
                  [ HP.classNames
                      [ "rounded-full"
                      , "bg-green-700"
                      , "h-2"
                      , "w-2"
                      , "mr-2"
                      ]
                  ]
                  []
              ]
            else []
          ) <>
            [ HH.span
                [ HP.classNames
                    [ if st.presence == Online then "text-green-700"
                      else "text-slate-600"
                    , "text-lg"
                    , "font-medium"
                    ]
                ]
                [ HH.text $ Username.toString st.username ]
            ]
      ]

