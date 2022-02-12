module Component.Navigation (render) where

import Prelude

import Data.Route (Route(..))
import Data.Route as Route
import Halogen as H
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP

render ∷ ∀ a s m. Route → H.ComponentHTML a s m
render route = HH.nav_
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
                  [ if route == Home then "overline"
                    else "no-underline"
                  , if route == Home then "text-blue-800"
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
                  [ if route == SignIn then "overline"
                    else "no-underline"
                  , if route == SignIn then "text-blue-800"
                    else "text-black"
                  ]
              , Route.href SignIn
              ]
              [ HH.text "SignIn" ]
          ]
      , HH.li [ HP.classNames [ "list-none", "mr-16", "mt-8", "text-xl" ] ]
          [ HH.a
              [ HP.classNames
                  [ if route == SignUp then "overline"
                    else "no-underline"
                  , if route == SignUp then "text-blue-800"
                    else "text-black"
                  ]
              , Route.href SignUp
              ]
              [ HH.text "SignUp" ]
          ]
      ]
  ]