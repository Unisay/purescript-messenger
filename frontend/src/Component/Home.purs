module Component.Home where

import Preamble

import AppM (App)
import AppM as App
import Auth as Auth
import Data.Route as Route
import Data.Username (Username)
import Halogen.Extended as H
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP

type State = { auth ∷ Maybe Username }

data Action = Initialize

component ∷ ∀ q i. H.Component q i App.Error App
component =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval $ H.defaultEval
        { handleAction = handleAction
        , initialize = Just Initialize
        }
    }

initialState ∷ ∀ i. i → State
initialState _ = { auth: Nothing }

render ∷ ∀ m. State → H.ComponentHTML Action () m
render { auth } = HH.div
  [ HP.classNames
      [ "flex"
      , "items-center"
      , "justify-center"
      , "min-h-screen"
      , "bg-gray-100"
      ]
  ]
  [ HH.div
      [ HP.classNames
          [ "max-w-md"
          , "w-full"
          , "space-y-8"
          , "rounded"
          , "border"
          , "border-slate-300"
          , "p-5"
          , "shadow-xl"
          , "bg-white"
          ]
      ]
      [ HH.h1
          [ HP.classNames
              [ "text-center"
              , "text-black"
              , "text-3xl"
              , "font-extrabold"
              ]
          ]
          [ HH.text "Pure Mess" ]
      , HH.div
          [ HP.classNames
              [ "flex"
              , "justify-between"
              , "w-full"
              , "basis-auto"
              ]
          ]
          $
            ( \route → pure
                $ HH.a
                    [ HP.classNames
                        [ "justify-center"
                        , "flex"
                        , "font-medium"
                        , "w-full"
                        ]
                    , Route.href route
                    ]
                    [ HH.span_ [ HH.text $ "Go to " <> show route ] ]
            )
          =<< case auth of
            Nothing → [ Route.SignIn, Route.SignUp, Route.Debug ]
            Just _ → pure Route.ChatWindow
      ]
  ]

handleAction ∷ ∀ s. Action → H.HalogenM State Action s App.Error App Unit
handleAction Initialize =
  H.raiseErrors Auth.username App.AuthError \username → do
    H.modify_ _ { auth = username }
