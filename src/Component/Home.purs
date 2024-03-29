module Component.Home where

import Preamble

import AppM (App)
import AppM as App
import Auth as Auth
import Data.Route as Route
import Halogen.Extended as H
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP

type State = { authInfo ∷ Maybe Auth.Info }

data Action = UpdateState State

type Input = State

component ∷ ∀ q. H.Component q Input App.Error App
component =
  H.mkComponent
    { initialState: identity
    , render
    , eval: H.mkEval $ H.defaultEval
        { handleAction = handleAction
        , receive = Just <<< UpdateState
        }
    }

render ∷ ∀ m. State → H.ComponentHTML Action () m
render { authInfo } = HH.div
  [ HP.classNames
      [ "flex"
      , "items-center"
      , "justify-center"
      , "grow"
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
              , "cursor-default"
              ]
          ]
          [ HH.text "PureMess" ]
      , HH.div
          [ HP.classNames
              [ "flex"
              , "justify-between"
              , "w-full"
              , "basis-auto"
              ]
          ]
          $ navLink
          <$> case authInfo of
            Nothing → [ { href: Route.href Route.Debug, label: "Debug" } ]
            Just _ → [ { href: Route.href Route.Chat, label: "Chat" } ]

      ]
  ]
  where
  navLink { href, label } =
    HH.a
      [ HP.classNames [ "justify-center", "flex", "font-medium", "w-full" ]
      , href
      ]
      [ HH.span_ [ HH.text $ "Go to " <> label ] ]

handleAction ∷ ∀ s. Action → H.HalogenM State Action s App.Error App Unit
handleAction = case _ of
  UpdateState state → H.put state
