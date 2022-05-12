module Component.ChatWindow where

import Preamble

import Auth as Auth
import Halogen.Extended as H
import Halogen.HTML.Events as HE
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended (InputType(..))
import Halogen.HTML.Properties.Extended as HP
import Web.Event.Internal.Types (Event)

data Action = SetMessage String | UpdateInfo Auth.Info | SendMessage Event

type Input = Auth.Info

type State =
  { info ∷ Auth.Info
  , message ∷ String
  }

component ∷ ∀ m o q. H.Component q Input o m
component = H.mkComponent
  { initialState
  , render
  , eval: H.mkEval $ H.defaultEval
      { handleAction = handleAction
      , receive = UpdateInfo >>> Just
      }
  }

initialState ∷ Input → State
initialState info = { info, message: "" }

render ∷ ∀ m. State → H.ComponentHTML Action () m
render _state = HH.div
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
  , HH.form
      [ HE.onSubmit SendMessage
      , HP.classNames
          [ "absolute"
          , "bottom-0"
          , "w-full"
          , "flex"
          , "rounded-full"
          , "bg-white"
          , "border"
          , "border-slate-400"
          , "hover:drop-shadow"
          ]
      ]
      [ HH.input
          [ HE.onValueInput SetMessage
          , HP.placeholder "Enter your message here!"
          , HP.classNames
              [ "w-full"
              , "h-8"
              , "focus:outline-none"
              , "focus:cursor-text"
              , "cursor-pointer"
              , "rounded-full"
              , "pl-2"
              , "overflow-scroll"
              , "placeholder:gray-500"
              , "placeholder:italic"
              ]
          ]
      , HH.input
          [ HP.classNames
              [ "w-8"
              , "h-8"
              , "rounded-full"
              , "bg-blue-500"
              , "text-center"
              , "text-white"
              , "duration-200"
              , "hover:bg-blue-600"
              , "hover:cursor-pointer"
              , "focus:outline-none"
              , "transition"
              ]
          , HP.value "↑"
          , HP.type_ InputSubmit
          ]
      ]
  ]

handleAction ∷ ∀ o m. Action → H.HalogenM State Action () o m Unit
handleAction = case _ of
  UpdateInfo info → H.modify_ _ { info = info }
  SetMessage _str → pure unit
  SendMessage _ → pure unit
