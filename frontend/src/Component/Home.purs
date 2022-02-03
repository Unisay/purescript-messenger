module Component.Home where

import Prelude

import Data.Route (Route(..), goTo)
import Effect.Aff.Class (class MonadAff)
import Halogen as H
import Halogen.HTML.Events as HE
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP

type State = Unit

data Action = ButtonClicked

component :: forall q i o m. MonadAff m => H.Component q i o m
component =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval $ H.defaultEval { handleAction = handleAction }
    }

initialState :: forall i. i -> State
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
          [ HH.text "Pure Mess" ]
      , HH.button
          [ HP.type_ HP.ButtonButton
          , HE.onClick \_ -> ButtonClicked
          , HP.classNames
              [ "justify-center"
              , "flex"
              , "font-medium"
              , "w-full"
              ]
          ]
          [ HH.span
              [ HP.classNames [] ]
              [ HH.text "Go to SignIn" ]
          ]
      ]
  ]

handleAction
  :: forall i o m. MonadAff m => Action -> H.HalogenM State Action i o m Unit
handleAction ButtonClicked = goTo SignIn

