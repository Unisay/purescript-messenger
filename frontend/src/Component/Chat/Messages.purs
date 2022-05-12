module Component.Chat.Messages where

import Preamble

import Backend as Backend
import Effect.Class (class MonadEffect)
import Halogen.Extended as H
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP

data Action
type Input = Unit
type Output = Backend.Error
type State = {}

component ∷ ∀ m q. MonadEffect m ⇒ H.Component q Input Output m
component = H.mkComponent
  { initialState
  , render
  , eval: H.mkEval $ H.defaultEval
  }

initialState ∷ Input → State
initialState _ = {}

render ∷ ∀ m. State → H.ComponentHTML Action () m
render {} = HH.div
  [ HP.classNames
      [ "border-2"
      , "border-slate-400"
      , "w-full"
      , "h-max"
      , "min-h-chat"
      , "rounded-b-md"
      , "flex"
      , "flex-col"
      , "align-between"
      , "relative"
      , "rounded-b-20px"
      , "bg-slate-200"
      ]
  ]
  [ HH.div [ HP.classNames [ "h-4/5", "w-full", "block" ] ] []
  ]
