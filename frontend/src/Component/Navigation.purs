module Component.Navigation
  ( Query(..)
  , component
  ) where

import Prelude

import Data.Maybe (Maybe(..))
import Data.Route (Route(..))
import Data.Route as Route
import Effect.Aff.Class (class MonadAff)
import Halogen as H
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP

type State = { currentRoute ∷ Maybe Route }
type Action = Unit

data Query a = Navigate Route a

component ∷ ∀ i o m. MonadAff m ⇒ H.Component Query i o m
component =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval $ H.defaultEval { handleAction = handleAction }
    }

initialState ∷ ∀ i. i → State
initialState _input = { currentRoute: Nothing }

render ∷ ∀ m. State → H.ComponentHTML Action () m
render state = HH.nav_
  [ HH.ul
      [ HP.classNames
          [ "bg-white"
          , "pt-4"
          , "pr-0"
          , "flex"
          , "justify-end"
          , "align-center"
          ]
      ]
      [ HH.li [ HP.classNames [ "list-none", "ml-8", "mr-auto", "mt-8" ] ]
          [ HH.a
              [ HP.classNames
                  [ if state.currentRoute == Just Home then "overline"
                    else "no-underline"
                  , if state.currentRoute == Just Home then "text-blue-800"
                    else
                      "text-black"
                  , "font-bold"
                  , "text-2xl"
                  ]
              , Route.href Home
              ]
              [ HH.text "PureMess" ]
          ]
      , HH.li [ HP.classNames [ "list-none", "mr-16", "mt-8", "text-xl" ] ]
          [ HH.a
              [ HP.classNames
                  [ if state.currentRoute == Just SignIn then "overline"
                    else "no-underline"
                  , if state.currentRoute == Just SignIn then "text-blue-800"
                    else "text-black"
                  ]
              , Route.href SignIn
              ]
              [ HH.text "SignIn" ]
          ]
      , HH.li [ HP.classNames [ "list-none", "mr-16", "mt-8", "text-xl" ] ]
          [ HH.a
              [ HP.classNames
                  [ if state.currentRoute == Just SignUp then "overline"
                    else "no-underline"
                  , if state.currentRoute == Just SignUp then "text-blue-800"
                    else "text-black"
                  ]
              , Route.href SignUp
              ]
              [ HH.text "SignUp" ]
          ]
      ]
  ]

handleAction
  ∷ ∀ i o m. MonadAff m ⇒ Action → H.HalogenM State Action i o m Unit
handleAction _action = pure unit

