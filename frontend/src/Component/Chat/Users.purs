module Component.Chat.Users where

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

data Action = Initialize | ReceiveAuth Auth.Info

type Input = Auth.Info

type Output = Backend.Error

type State =
  { authInfo ∷ Auth.Info
  , users ∷ RemoteData Unit (Array UserPresence)
  }

component ∷ ∀ q. H.Component q Input Output App
component =
  H.mkComponent
    { initialState: \authInfo → { authInfo, users: RD.NotAsked }
    , render
    , eval: H.mkEval $ H.defaultEval
        { handleAction = handleAction
        , receive = ReceiveAuth >>> Just
        , initialize = Just Initialize
        }
    }

render ∷ ∀ m. State → H.ComponentHTML Action () m
render { users } =
  HH.div
    [ HP.classNames
        [ "flex"
        , "block"
        , "flex-col"
        , "bg-slate-200"
        , "opacity-90"
        , "rounded-br-md"
        , "border-r"
        , "border-b"
        , "border-slate-300"
        , "pr-2"
        , "max-w-fit"
        , "min-w-fit"
        , "overflow-scroll"
        ]
    ]
    [ case users of
        RD.Success loadedUsers →
          HH.ul [ HP.classNames [ "w-full", "p-2" ] ]
            $ map renderUsers (Array.sortWith _.presence loadedUsers)
        RD.NotAsked →
          HH.text "To be loaded."
        RD.Loading →
          HH.text "Loading..."
        RD.Failure _ →
          HH.text "Not Loaded. Please refresh."
    ]

  where
  renderUsers ∷ UserPresence → HH.ComponentHTML Action () m
  renderUsers st =
    HH.li
      [ HP.classNames [ "flex", "flex-row" ] ]
      [ HH.div
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

handleAction ∷ ∀ s. Action → H.HalogenM State Action s Output App Unit
handleAction = case _ of
  Initialize → do
    H.modify_ _ { users = RD.Loading }
    token ← H.gets _.authInfo.token
    H.raiseError (Backend.listUsers token) \userPresenses →
      H.modify_ _ { users = RD.Success userPresenses }
  ReceiveAuth authInfo →
    H.modify_ _ { authInfo = authInfo }

