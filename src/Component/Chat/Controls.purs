module Component.Chat.Controls where

import Preamble

import AppM (App)
import Auth as Auth
import Backend as Backend
import Backend as Chat
import DOM.HTML.Indexed.WrapValue (WrapValue(..))
import Data.Message (Message)
import Data.Message as Message
import Data.Newtype (unwrap)
import Data.String as String
import Data.Validation (Validation)
import Effect.Aff (Milliseconds(..), delay)
import Effect.Aff.Class (liftAff)
import Halogen.Extended (PropName(..))
import Halogen.Extended as H
import Halogen.HTML.Events as HE
import Halogen.HTML.Extended (prop)
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended (InputType(..))
import Halogen.HTML.Properties.Extended as HP
import Prelude (whenM)
import Web.Event.CustomEvent as CustomEvent
import Web.Event.Event as Event
import Web.Event.Internal.Types (Event)
import Web.HTML.Event.EventTypes (submit)
import Web.UIEvent.KeyboardEvent (KeyboardEvent, key, shiftKey, toEvent)

data Action
  = SetMessage String
  | UpdateInfo Auth.User
  | SendMessage Event
  | KeyPressed KeyboardEvent

type Input = Auth.User

type State =
  { user ∷ Auth.User
  , message ∷ Validation Message
  , buttonBlocked ∷ Boolean
  , sendCooldown ∷ Boolean
  }

type Output = Backend.Error

component ∷ ∀ q. H.Component q Input Output App
component = H.mkComponent
  { initialState
  , render
  , eval: H.mkEval $ H.defaultEval
      { handleAction = handleAction
      , receive = UpdateInfo >>> Just
      }
  }

initialState ∷ Input → State
initialState user =
  { buttonBlocked: true
  , sendCooldown: false
  , message: { inputValue: "", result: Nothing }
  , user
  }

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
          , "h-21"
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
  , HH.p
      [ HP.classNames
          $
            [ "right-0"
            , "bottom-0"
            , "absolute"
            , "mr-2"
            , "mb-9"
            , "text-base"
            ]
          <>
            if String.length state.message.inputValue > 800 then
              [ "text-red-500", "font-medium" ]
            else [ "text-slate-400", "italic", "font-leight" ]
      , prop (PropName "hidden") (String.null state.message.inputValue)
      ]
      [ HH.text $ show $ String.length state.message.inputValue ]
  , HH.input
      [ HP.classNames
          $
            [ "w-9"
            , "h-9"
            , "text-center"
            , "text-white"
            , "duration-200"
            , "focus:outline-none"
            , "transition"
            , "absolute"
            , "right-0"
            , "bottom-0"
            , "rounded-br-lg"
            , "rounded-tl-lg"
            ]
          <>
            if isBlocked || state.sendCooldown then
              [ "bg-gray-500", "cursor-not-allowed" ]
            else
              [ "bg-blue-500"
              , "hover:bg-blue-600"
              , "hover:cursor-pointer"
              , "active:bg-blue-700"
              , "active:border"
              , "active:border-blue-700"
              , "active:scale-101"
              ]
      , HP.value "↑"
      , HP.type_ InputSubmit
      , HP.id "controls"
      , HP.disabled (isBlocked || state.sendCooldown)
      ]
  ]
  where
  isBlocked = if state.buttonBlocked then true else false

handleAction ∷ Action → H.HalogenM State Action () Output App Unit
handleAction = case _ of
  UpdateInfo user → H.modify_ _ { user = user }
  SetMessage str →
    H.modify_ _ { message { inputValue = String.trim str } }
      *> validateInput
  SendMessage ev → do
    liftEffect $ Event.preventDefault ev
    H.gets _.message.inputValue <#> Message.parse >>= case _ of
      Left err → do
        H.modify_ _
          { buttonBlocked = true, message { result = Just $ Left err } }
      Right text → do
        author ← H.gets $ _.user >>> unwrap >>> _.name
        token ← Auth.token
        msg ← liftAff $ Message.create text author
        H.raiseError_ (Chat.sendMessage msg token)
        H.modify_ _ { buttonBlocked = true, message { inputValue = "" } }
        goOnCooldown
  KeyPressed keyEv → when (not $ shiftKey keyEv)
    case key keyEv of
      "Enter" → do
        liftEffect $ Event.preventDefault $ toEvent keyEv
        isBlocked ← H.gets _.buttonBlocked
        onCooldown ← H.gets _.sendCooldown
        when (not $ isBlocked || onCooldown)
          $ liftEffect (CustomEvent.new submit)
          >>= CustomEvent.toEvent
          >>> SendMessage
          >>> handleAction
      _ → pass
  where
  validateInput = H.gets _.message.inputValue <#> Message.parse >>=
    either (const $ H.modify_ _ { buttonBlocked = true }) (const unblockBtn)

  unblockBtn = H.modify_ _ { buttonBlocked = false }
    # whenM (H.gets _.buttonBlocked)

  goOnCooldown = do
    H.modify_ _ { sendCooldown = true }
    liftAff $ delay (Milliseconds 1000.0)
    H.modify_ _ { sendCooldown = false }

