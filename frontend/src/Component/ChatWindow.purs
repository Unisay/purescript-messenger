module Component.ChatWindow where

import Preamble

import AppM (App)
import AppM as App
import Auth (withAuth)
import Backend as Backend
import Chat.Api.Http (UserPresence)
import Chat.Presence (Presence(..))
import Control.Monad.Error.Class (throwError)
import Control.Monad.Except (runExceptT)
import Data.Array as Array
import Data.Username as Username
import Halogen as H
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP
import Network.RemoteData (RemoteData)
import Network.RemoteData as RD

type State = { users ∷ RemoteData Unit (Array UserPresence) }

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

handleAction ∷ ∀ s o. Action → H.HalogenM State Action s o App Unit
handleAction Initialize = withAuth \token → do
  H.modify_ _ { users = RD.Loading }
  runExceptT (Backend.listUsers token) >>= case _ of
    Left backendError → do
      H.modify_ _ { users = RD.Failure unit }
      throwError $ App.BackendError backendError
    Right userPresenses → do
      H.modify_ _ { users = RD.Success userPresenses }

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
  [ HH.ul [ HP.classNames [ "w-full", "p-2" ] ]
      $ renderUsers
      <$> Array.sortWith _.presence (RD.withDefault [] users)
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
          ]
          $
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
            )
          <>
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

