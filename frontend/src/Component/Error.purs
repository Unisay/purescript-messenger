module Component.Error where

import Prelude

import Halogen as H
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP

type Input = Unit

type State = Unit

component ∷ ∀ q o m. H.Component q Input o m
component = H.mkComponent
  { initialState
  , render
  , eval: H.mkEval $ H.defaultEval
  }

initialState ∷ Input → State
initialState _ = unit

render ∷ ∀ a m. State → H.ComponentHTML a () m
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
          , "flex"
          , "flex-col"
          , "justify-center"
          , "items-center"
          , "space-y-3"
          , "rounded"
          , "border"
          , "border-slate-300"
          , "p-5"
          , "shadow-xl"
          , "bg-white"
          ]
      ]
      [ HH.span [ HP.classNames [ "text-8xl", "font-semibold" ] ]
          [ HH.text "Oooops," ]
      , HH.span
          [ HP.classNames [ "font-medium", "text-center" ]
          ]
          [ HH.text
              """Seems like something went wrong! 
              You may contact our developers or try again later."""
          ]
      ]

  ]