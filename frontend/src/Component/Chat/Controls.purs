module Component.Chat.Controls where

import Preamble

import Auth as Auth
import Data.Message (Message)
import Data.Validation (Validation)
import Effect.Class (class MonadEffect)
import Halogen.Extended (liftEffect)
import Halogen.Extended as H
import Halogen.HTML.Events as HE
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended (InputType(..))
import Halogen.HTML.Properties.Extended as HP
import Web.Event.Event as Event
import Web.Event.Internal.Types (Event)

data Action = SetMessage String | UpdateInfo Auth.Info | SendMessage Event

type Input = Auth.Info

type State =
  { info ∷ Auth.Info
  , message ∷ Validation Message
  }

component ∷ ∀ m o q. MonadEffect m ⇒ H.Component q Input o m
component = H.mkComponent
  { initialState
  , render
  , eval: H.mkEval $ H.defaultEval
      { handleAction = handleAction
      , receive = UpdateInfo >>> Just
      }
  }

initialState ∷ Input → State
initialState info = { info, message: { inputValue: "", result: Nothing } }

render ∷ ∀ m. State → H.ComponentHTML Action () m
render _state = HH.form
  [ HE.onSubmit SendMessage
  , HP.classNames
      [ "absolute"
      , "bottom-0"
      , "w-full"
      , "flex"
      , "rounded-full"
      , "bg-white"
      , "shadow-up"
      , "transition"
      , "duration-200"
      ]
  ]
  [ HH.input
      [ HE.onValueInput SetMessage
      , HP.placeholder "Enter your message here!"
      , HP.autofocus true
      , HP.classNames
          [ "w-full"
          , "h-8"
          , "focus:outline-none"
          , "focus:cursor-text"
          , "cursor-pointer"
          , "rounded-full"
          , "pl-2"
          , "pr-9"
          , "overflow-scroll"
          , "placeholder:gray-500"
          , "placeholder:italic"
          , "border"
          , "border-slate-400"
          , "focus:border-slate-500"
          , "hover:border-slate-500"
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
          , "absolute"
          , "right-0"
          ]
      , HP.value "↑"
      , HP.type_ InputSubmit
      ]
  ]

handleAction
  ∷ ∀ o m. MonadEffect m ⇒ Action → H.HalogenM State Action () o m Unit
handleAction = case _ of
  UpdateInfo info → H.modify_ _ { info = info }
  SetMessage str → H.modify_ _ { message { inputValue = str } }
  SendMessage ev → liftEffect $ Event.preventDefault ev
