module Component.Chat.Controls where

import Preamble

import Auth as Auth
import DOM.HTML.Indexed.WrapValue (WrapValue(..))
import Data.Message (Message)
import Data.Validation (Validation)
import Effect.Class (class MonadEffect)
import Halogen.Extended (PropName(..), liftEffect)
import Halogen.Extended as H
import Halogen.HTML.Events as HE
import Halogen.HTML.Extended (prop)
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended (InputType(..))
import Halogen.HTML.Properties.Extended as HP
import Web.Event.Event as Event
import Web.Event.Internal.Types (Event)
import Web.UIEvent.KeyboardEvent (KeyboardEvent, key, shiftKey)

data Action
  = SetMessage String
  | UpdateInfo Auth.Info
  | SendMessage Event
  | KeyPressed KeyboardEvent

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
render state = HH.form
  [ HE.onSubmit SendMessage
  , HP.id "controls"
  , HP.classNames
      [ "w-full"
      , "flex"
      , "relative"
      , "bg-white"
      , "transition"
      , "duration-200"
      , "shadow-xl"
      , "rounded-b-lg"
      ]
  ]
  [ HH.textarea
      [ HE.onValueInput SetMessage
      , HP.placeholder "Enter your message here!"
      , HP.autofocus true
      , HP.id "controls"
      , HE.onKeyDown KeyPressed
      , prop (PropName "wrap") Soft
      , HP.value state.message.inputValue
      , HP.classNames
          [ "w-full"
          , "focus:outline-none"
          , "focus:cursor-text"
          , "cursor-pointer"
          , "rounded-b-lg"
          , "pl-2"
          , "pr-10"
          , "overflow-scroll"
          , "placeholder:gray-500"
          , "placeholder:italic"
          , "border"
          , "border-slate-400"
          , "focus:border-slate-500"
          , "hover:border-slate-500"
          , "transition"
          , "duration-100"
          , "pt-1"
          , "resize-none"
          , "overflow-hidden"
          ]
      ]
  , HH.input
      [ HP.classNames
          [ "w-9"
          , "h-9"
          , "bg-blue-500"
          , "text-center"
          , "text-white"
          , "duration-200"
          , "hover:bg-blue-600"
          , "active:bg-blue-700"
          , "hover:cursor-pointer"
          , "focus:outline-none"
          , "transition"
          , "absolute"
          , "right-0"
          , "bottom-0"
          , "rounded-br-lg"
          , "rounded-tl-lg"
          , "active:border"
          , "active:border-blue-700"
          , "active:scale-101"
          ]
      , HP.value "↑"
      , HP.type_ InputSubmit
      , HP.id "controls"
      ]
  ]

handleAction
  ∷ ∀ o m. MonadEffect m ⇒ Action → H.HalogenM State Action () o m Unit
handleAction = case _ of
  UpdateInfo info → H.modify_ _ { info = info }
  SetMessage str → H.modify_ _ { message { inputValue = str } }
  SendMessage ev → do
    liftEffect $ Event.preventDefault ev
    H.modify_ _ { message { inputValue = "" } }
  KeyPressed k →
    if shiftKey k then pass
    else case key k of
      "Return" → pure unit -- needs last version of `web-events`
      _ → pass
