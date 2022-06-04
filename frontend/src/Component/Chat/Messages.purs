module Component.Chat.Messages where

import Preamble

import AppM (App)
import Auth (Info) as Auth
import Backend as Backend
import Control.Monad.Rec.Class (forever)
import Data.Array as Array
import Data.Formatter.DateTime (format)
import Data.Formatter.DateTime as F
import Data.List (List(..), (:))
import Data.Message (Message(..))
import Data.Number (abs)
import Data.String as String
import Data.String.NonEmpty as NES
import Data.Traversable (traverse_)
import Data.Username as Username
import Effect.Aff (Milliseconds(..))
import Effect.Aff as Aff
import Effect.Class.Console (warn)
import Halogen.Extended as H
import Halogen.HTML.Events as HE
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP
import Halogen.Subscription as HS
import Web.DOM (Element)
import Web.DOM.Document (toNonElementParentNode)
import Web.DOM.Element (clientHeight, scrollHeight, scrollTop, setScrollTop)
import Web.DOM.NonElementParentNode (getElementById)
import Web.HTML (window)
import Web.HTML.HTMLDocument (toDocument)
import Web.HTML.Window (document)

data Action = Initialize | Tick | MessagesScroll 

type Input = Auth.Info

type Output = Backend.Error

data ScrollMode = Following | NotFollowing

type State =
  { auth ∷ Auth.Info
  , messages ∷ Array Message
  , scrollMode ∷ ScrollMode
  }

component ∷ ∀ q. H.Component q Input Output App
component = H.mkComponent
  { initialState
  , render
  , eval: H.mkEval $
      H.defaultEval
        { initialize = Just Initialize
        , handleAction = handleAction
        }
  }

initialState ∷ Input → State
initialState auth = { auth, scrollMode: Following, messages: [] }

render ∷ ∀ m. State → H.ComponentHTML Action () m
render state = HH.div
  [ HP.id "messages"
  , HP.classNames $ Array.concat
      [ [ "border-x-2"
        , "border-t-2"
        , "border-slate-400"
        , "rounded-t-sm"
        , "overflow-y-scroll"
        , "h-messages"
        , "flex-none"
        , "pl-2"
        , "pr-1"
        ]
      , case state.scrollMode of
          Following → [ "bg-slate-100" ]
          NotFollowing → [ "bg-slate-300" ]
      ]
  , HE.onScroll $ const MessagesScroll
  ]
  [ HH.ol
      [ HP.classNames
          [ "font-mono"
          , "flex"
          , "flex-col-reverse"
          , "wrap-anywhere"
          ]
      ]
      $ state.messages
      <#> \(Message m) →
        HH.li_
          [ HH.text $ String.joinWith " "
              [ format
                  ( F.Placeholder "["
                      : F.DayOfMonth
                      : F.Placeholder " "
                      : F.MonthShort
                      : F.Placeholder " "
                      : F.Hours24
                      : F.Placeholder ":"
                      : F.MinutesTwoDigits
                      : F.Placeholder "]"
                      : Nil
                  )
                  m.createdAt
              , Username.toString m.username
              , ":"
              , NES.toString m.text
              ]
          ]

  , HH.div [ HP.id "bottom" ] []
  ]

handleAction ∷ Action → H.HalogenM State Action () Output App Unit
handleAction = case _ of
  Initialize → do
    _ ← H.subscribe =<< timer Tick
    updateMessages
  Tick →
    updateMessages
  MessagesScroll →
    liftEffect messagesScrollInfo >>= traverse_ \{ sheight, cheight, top } → do
      if abs (sheight - (cheight + top)) > 1.0 then
        H.modify_ _ { scrollMode = NotFollowing }
      else H.modify_ _ { scrollMode = Following }

  where
  updateMessages = do
    token ← H.gets _.auth.token
    H.raiseError (Backend.getLastMessages token) \messages → do
      H.modify_ _ { messages = messages }
      updateScroll
  timer val = do
    { emitter, listener } ← H.liftEffect HS.create
    _ ← H.liftAff $ Aff.forkAff $ forever do
      Aff.delay $ Milliseconds 1000.0
      H.liftEffect $ HS.notify listener val
    pure emitter

  updateScroll = H.gets _.scrollMode >>= case _ of
    NotFollowing → pass
    Following → liftEffect scrollToBottom

  messagesScrollInfo ∷ Effect (Maybe ScrollInfo)
  messagesScrollInfo = do
    parent ← window >>= document <#> toDocument >>> toNonElementParentNode
    let elementId = "messages"
    getElementById elementId parent >>= case _ of
      Just el → do
        sheight ← scrollHeight el
        cheight ← clientHeight el
        top ← scrollTop el
        pure $ Just { el, cheight, sheight, top }
      Nothing → do
        warn $ "DOM Element not found by id = '" <> elementId <> "'"
        pure Nothing

  scrollToBottom ∷ Effect Unit
  scrollToBottom = messagesScrollInfo >>= traverse_ \{ el, sheight } →
    setScrollTop sheight el

type ScrollInfo =
  { el ∷ Element
  , cheight ∷ Number
  , sheight ∷ Number
  , top ∷ Number
  }

type ElementId = String
