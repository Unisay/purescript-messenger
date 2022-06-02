module Component.Chat.Controls where

import Preamble

import AppM (App)
import Auth as Auth
import Backend as Backend
import Backend as Chat
import Control.Monad.Reader (asks)
import DOM.HTML.Indexed.WrapValue (WrapValue(..))
import Data.Array.NonEmpty as NEA
import Data.Message (Message(..))
import Data.Message as Message
import Data.Notification (important)
import Data.Validation (Validation)
import Effect.Aff (Milliseconds(..), delay)
import Effect.Now (nowDateTime)
import Halogen.Extended (PropName(..), liftAff)
import Halogen.Extended as H
import Halogen.HTML.Events as HE
import Halogen.HTML.Extended (prop)
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended (InputType(..))
import Halogen.HTML.Properties.Extended as HP
import Halogen.Subscription as HS
import Prelude (whenM)
import Web.Event.CustomEvent as CustomEvent
import Web.Event.Event as Event
import Web.Event.Internal.Types (Event)
import Web.HTML.Event.EventTypes (submit)
import Web.UIEvent.KeyboardEvent (KeyboardEvent, key, shiftKey, toEvent)

data Action
  = SetMessage String
  | UpdateInfo Auth.Info
  | SendMessage Event
  | KeyPressed KeyboardEvent

type Input = Auth.Info

type State =
  { info ∷ Auth.Info
  , message ∷ Validation Message
  , delay ∷ Boolean
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
initialState info =
  { delay: false
  , message: { inputValue: "", result: Nothing }
  , info
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
            if isDelay then [ "bg-gray-500", "cursor-not-allowed" ]
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
      , HP.disabled isDelay
      ]
  ]
  where
  isDelay = if state.delay then true else false

handleAction ∷ Action → H.HalogenM State Action () Output App Unit
handleAction = case _ of
  UpdateInfo info → H.modify_ _ { info = info }
  SetMessage str → H.modify_ _ { message { inputValue = str } }
  SendMessage ev → do
    liftEffect $ Event.preventDefault ev
    H.gets _.message.inputValue >>= \s → case Message.parse s of
      Left err → do
        H.modify_ _ { delay = true, message { result = Just $ Left err } }
        notify ← asks _.notifications.listener <#> \listener →
          HS.notify listener >>> liftEffect
        notify $ important $ NEA.head err
        disableSending
      Right text → do
        username ← H.gets _.info.username
        token ← H.gets _.info.token
        createdAt ← liftEffect nowDateTime
        let message = Message { text, createdAt, username }
        H.raiseError_ $ Chat.sendMessage username message token
        H.modify_ _ { delay = true, message { inputValue = "" } }
        disableSending
  KeyPressed keyEv → do
    if shiftKey keyEv then pass
    else case key keyEv of
      "Enter" → do
        liftEffect $ Event.preventDefault $ toEvent keyEv
        whenM (not <$> H.gets _.delay)
          $ liftEffect (CustomEvent.new submit)
          >>= CustomEvent.toEvent
          >>> SendMessage
          >>> handleAction
      _ → pass
  where
  disableSending = do
    liftAff $ delay $ Milliseconds 500.0
    H.modify_ _ { delay = false }
