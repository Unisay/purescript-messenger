module Component.Userlist where

import Preamble

import Chat.Api.Http (UserPresence)
import Chat.Presence (Presence(..))
import Data.Array as Array
import Data.Username as Username
import Halogen.Extended as H
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP

component ∷ ∀ q o m. H.Component q Input o m
component =
  H.mkComponent
    { initialState: identity
    , render
    , eval: H.mkEval $ H.defaultEval
        { handleAction = handleAction
        , receive = UsersUpdate >>> Just
        }
    }

data Action = UsersUpdate (Array UserPresence)

type Input = Array UserPresence

type State = Array UserPresence

render ∷ ∀ m. State → H.ComponentHTML Action () m
render users =
  HH.div
    [ HP.classNames
        [ "flex"
        , "flex-col"
        , "w-1/5"
        , "min-w-fit"
        , "min-h-fit"
        , "bg-slate-200"
        , "opacity-90"
        ]
    ]
    [ HH.ul [ HP.classNames [ "w-full", "p-2" ] ]
        $ renderUsers
        <$> Array.sortWith _.presence users
    ]

  where
  renderUsers ∷ UserPresence → HH.ComponentHTML Action () m
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

handleAction ∷ ∀ o m s. Action → H.HalogenM State Action s o m Unit
handleAction (UsersUpdate users) = H.modify_ $ const users

