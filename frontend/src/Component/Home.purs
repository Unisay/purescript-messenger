module Component.Home where

import Preamble

import AppM (App)
import AppM as App
import Auth (Info)
import Auth as Auth
import Data.Route as Route
import Halogen.Extended as H
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP

type State = { auth ∷ Maybe Info }

data Action = Initialize

data Query a = SetAuth Auth.Info a

component ∷ ∀ i. H.Component Query i App.Error App
component =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval $ H.defaultEval
        { handleAction = handleAction
        , handleQuery = handleQuery
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
            ( \route → HH.a
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
          <$> case auth of
            Nothing → [ Route.SignIn, Route.SignUp, Route.Debug ]
            Just _ → [ Route.ChatWindow ]
      ]
  ]

handleQuery ∷ ∀ s o a. Query a → H.HalogenM State Action s o App (Maybe a)
handleQuery (SetAuth info a) = do
  log "Home got query"
  H.modify_ _ { auth = Just info } $> Just a

handleAction ∷ ∀ s. Action → H.HalogenM State Action s App.Error App Unit
handleAction Initialize = do
  log "Initializing home"
  H.raiseErrors Auth.loadInfo App.AuthError
    \info → H.modify_ _ { auth = info }
