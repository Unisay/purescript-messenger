module Component.ChatWindow where

import Preamble

import AppM (App)
import Auth as Auth
import Backend as Backend
import Chat.Api.Http (UserPresence)
import Chat.Presence (Presence(..))
import Data.Array as Array
import Data.Username as Username
import Halogen.Extended as H
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP
import Network.RemoteData (RemoteData)
import Network.RemoteData as RD

type State =
  { users ∷ RemoteData Unit (Array UserPresence)
  , authInfo ∷ Auth.Info
  }

data Action = Initialize

type Input = Auth.Info

type Output = Backend.Error

component ∷ ∀ q. H.Component q Input Output App
component =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval $ H.defaultEval
        { initialize = Just Initialize
        , handleAction = handleAction
        }
    }

initialState ∷ Auth.Info → State
initialState authInfo = { users: RD.NotAsked, authInfo }

handleAction ∷ ∀ s. Action → H.HalogenM State Action s Backend.Error App Unit
handleAction Initialize = do
  H.modify_ _ { users = RD.Loading }
  token ← H.gets _.authInfo.token
  H.raiseError (Backend.listUsers token) \userPresenses →
    H.modify_ _ { users = RD.Success userPresenses }

render ∷ ∀ m a. State → H.ComponentHTML a () m
render { users } = HH.div
  [ HP.classNames
      [ "min-h-screen"
      , "w-full"
      , "bg-gray-100"
      ]
  ]
  [ HH.div [ HP.classNames [ "mt-20" ] ]
      [ HH.div
          [ HP.classNames
              [ "flex"
              , "flex-col"
              , "w-1/5"
              , "bg-slate-200"
              , "opacity-90"
              ]
          ]
          [ HH.ul [ HP.classNames [ "w-full", "p-2" ] ]
              $ renderUsers
              <$> Array.sortWith _.presence (RD.withDefault [] users)
          ]
      ]
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

