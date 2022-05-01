module Component.Home where

import Preamble

import Data.Route as Route
import Effect.Aff.Class (class MonadAff)
import Halogen as H
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP

component ∷ ∀ m o q i. MonadAff m ⇒ H.Component q i o m
component =
  H.mkComponent
    { initialState: const unit
    , render
    , eval: H.mkEval H.defaultEval
    }

render ∷ ∀ m a s. s → H.ComponentHTML a () m
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
      , HH.div
          [ HP.classNames
              [ "flex"
              , "justify-between"
              , "w-full"
              , "basis-auto"
              ]
          ]
          $ [ Route.SignIn, Route.SignUp, Route.Debug ]
          >>= \route → pure $
            HH.a
              [ HP.classNames
                  [ "justify-center"
                  , "flex"
                  , "font-medium"
                  , "w-full"
                  ]
              , Route.href route
              ]
              [ HH.span_ [ HH.text $ "Go to " <> show route ] ]
      ]
  ]
