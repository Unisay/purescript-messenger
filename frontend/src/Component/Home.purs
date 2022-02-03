module Component.Home where

import Prelude

import Effect.Aff.Class (class MonadAff)
import Effect.Class.Console (log)
import Halogen as H
import Halogen.HTML.Events as HE
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP

type State = Unit

data Action = ButtonClicked

component :: forall query input output m. H.Component query input output m
component =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval H.defaultEval
    }

initialState :: forall input. input -> State
initialState _input = unit

render :: forall m. State -> H.ComponentHTML Action () m
render _state = HH.div
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
          [ HH.text "PureMess Messanger" ]
      ]
  , HH.div_
      [ HH.button
          [ HP.type_ HP.ButtonButton
          , HE.onClick \_ -> ButtonClicked
          , HP.classNames
              [ "justify-center"
              , "flex"
              , "font-medium"
              ]
          ]
          [ HH.span
              [ HP.classNames
                  [ "left-0"
                  , "flex"
                  , "items-center"
                  , "pl-3"
                  ]
              ]
              [ HH.text "Go to SignIn" ]
          ]
      ]
  ]

handleAction
  :: forall i o m. MonadAff m => Action -> H.HalogenM State Action i o m Unit
handleAction ButtonClicked = log "Go to SignIn"

