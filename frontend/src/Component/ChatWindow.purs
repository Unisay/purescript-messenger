module Component.ChatWindow where

import Prelude

import Chat.Presence (Presence(..))
import Data.Array as Array
import Data.Username (Username)
import Data.Username as Username
import Effect.Aff.Class (class MonadAff)
import Halogen as H
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP

type User = { username ∷ Username, presence ∷ Presence, self ∷ Boolean }

type State = { users ∷ Array User }

component ∷ ∀ q i o m. MonadAff m ⇒ H.Component q i o m
component =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval $ H.defaultEval
    }

initialState ∷ ∀ i. i → State
initialState _input =
  { users:
      [ { username: Username.unsafe "Vadym"
        , presence: Online
        , self: true
        }
      , { username: Username.unsafe "Yura"
        , presence: Online
        , self: false
        }
      , { username: Username.unsafe "Andrey"
        , presence: Away
        , self: false
        }
      ]
  }

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
  [ HH.ul
      [ HP.classNames [ "w-full", "p-2" ] ] $
      renderUsers <$> Array.sortWith _.presence users
  ]
  where
  renderUsers ∷ User → HH.ComponentHTML a () m
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
                [ HH.text $ Username.toString st.username <>
                    if st.self then " (You)"
                    else ""
                ]
            ]
      ]

