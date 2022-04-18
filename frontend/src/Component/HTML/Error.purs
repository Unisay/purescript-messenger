module Component.HTML.Error where

import Halogen as H
import Halogen.HTML.Events as HE
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP

render ∷ ∀ a m s. a → H.ComponentHTML a s m
render onClick = HH.div
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
      , HH.span [ HP.classNames [ "font-medium", "text-center" ] ]
          [ HH.text
              """
              We are really sorry, but application is unable to serve your
              request at this time because of an unexpected critical error.
              """
          ]
      , HH.button
          [ HP.classNames
              [ "group"
              , "w-full"
              , "flex"
              , "justify-center"
              , "py-2"
              , "px-4"
              , "border"
              , "border-transparent"
              , "text-sm"
              , "font-medium"
              , "rounded-md"
              , "text-white"
              , "bg-indigo-600"
              , "hover-bg-indigo-700"
              , "focus-outline-none"
              , "focus-ring-2"
              , "focus-ring-offset-2"
              , "focus-ring-indigo-500"
              ]
          , HE.onClick \_ → onClick
          ]
          [ HH.text "Retry" ]
      ]
  ]
