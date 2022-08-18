module Component.Chat.Messages where

import Preamble

import AppM (App)
import Auth (User, token) as Auth
import Backend (Direction(..))
import Backend as Backend
import Control.Monad.Rec.Class (forever)
import Data.Array as Array
import Data.Formatter.DateTime (format)
import Data.Formatter.DateTime as F
import Data.List (List(..), (:))
import Data.Message (Cursor, Message(..), SlidingWindow)
import Data.Number (abs)
import Data.String.NonEmpty as NES
import Data.Traversable (traverse_)
import Data.Username as Username
import Effect.Aff (Milliseconds(..))
import Effect.Aff as Aff
import Effect.Class.Console (warn)
import Halogen.Extended as H
import Halogen.HTML.Events as HE
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended (InputType(..))
import Halogen.HTML.Properties.Extended as HP
import Halogen.Subscription as HS
import Network.RemoteData (RemoteData(..))
import Network.RemoteData as RD
import Web.DOM (Element)
import Web.DOM.Document (toNonElementParentNode)
import Web.DOM.Element (clientHeight, scrollHeight, scrollTop, setScrollTop)
import Web.DOM.NonElementParentNode (getElementById)
import Web.HTML as Web
import Web.HTML.HTMLDocument (toDocument)
import Web.HTML.Window (document)

data Action
  = Initialize
  | Tick
  | MessagesScroll
  | ScrollBtnClicked
  | LoadPrevious

type Input = Auth.User

type Output = Backend.Error

data ScrollMode = Following | NotFollowing

type State =
  { user ∷ Auth.User
  , messages ∷ RemoteData Void (SlidingWindow Message)
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
initialState user =
  { user, scrollMode: Following, messages: NotAsked }

render ∷ ∀ m. State → H.ComponentHTML Action () m
render state = HH.div [ HP.classNames [ "relative" ] ]
  [ HH.div
      [ HP.id "messages"
      , HP.classNames
          [ "border-x-2"
          , "border-t-2"
          , "border-slate-400"
          , "rounded-t-sm"
          , "pl-2"
          , "pr-1"
          , "overflow-y-scroll"
          , "relative"
          , "h-chat"
          , "bg-slate-100"
          , "max-w-chat"
          ]
      , HE.onScroll $ const MessagesScroll
      ]
      [ HH.ol [ HP.classNames [ "flex", "flex-col" ] ] $ Array.cons
          ( HH.li []
              [ HH.a [ HE.onClick \_me → LoadPrevious ]
                  [ HH.text "Load previous messages" ]
              ]
          )
          ( (RD.withDefault [] (state.messages <#> _.items))
              <#> \(Message m) →
                HH.li_
                  [ HH.div
                      [ HP.classNames [ "font-mono" ] ]
                      [ HH.span
                          [ HP.classNames
                              [ "cursor-default"
                              , "text-blue-600"
                              , "font-datetime"
                              , "italic"
                              ]
                          ]
                          [ HH.text $ format dateTimeFormat m.createdAt <>
                              " "
                          ]
                      , HH.span
                          [ HP.classNames
                              [ "cursor-pointer"
                              , "text-blue-600"
                              , "hover:text-blue-700"
                              , "font-semibold"
                              ]
                          ]
                          [ HH.text $ Username.toString m.author <> ": " ]
                      , HH.p
                          [ HP.classNames
                              [ "break-words"
                              , "overflow-break-word"
                              ]
                          ]
                          [ HH.text $ NES.toString m.text ]
                      ]
                  ]
          )

      ]
  , HH.input
      [ HP.classNames
          $
            [ "w-8"
            , "h-8"
            , "text-center"
            , "text-white"
            , "duration-100"
            , "transition"
            , "rounded-lg"
            , "text-sm"
            , "text-center"
            , "z-50"
            , "absolute"
            , "right-0"
            , "bottom-0"
            , "cursor-pointer"
            , "mb-4"
            , "mr-5"
            , "bg-slate-400"
            , "hover:bg-slate-500"
            , "opacity-80"
            , "hover:opacity-70"
            ]
          <> if isFollowing then [ "hidden" ] else []
      , HP.value "⇣"
      , HP.type_ InputButton
      , HE.onClick $ const ScrollBtnClicked
      ]
  ]
  where
  dateTimeFormat =
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

  isFollowing = case state.scrollMode of
    Following → true
    NotFollowing → false

handleAction ∷ Action → H.HalogenM State Action () Output App Unit
handleAction = case _ of
  Initialize → do
    _ ← H.subscribe =<< timer Tick
    H.modify_ _ { messages = Loading }
    updateMessages Nothing Backward
  Tick →
    H.gets _.messages >>= \window → do
      let cursor = RD.toMaybe window <#> _.toCursor
      updateMessages cursor Forward
  MessagesScroll →
    messagesScrollInfo >>= traverse_ \{ sheight, cheight, top } → do
      if abs (sheight - (cheight + top)) > 1.0 then
        H.modify_ _ { scrollMode = NotFollowing }
      else H.modify_ _ { scrollMode = Following }
  ScrollBtnClicked →
    scrollToBottom
  LoadPrevious →
    H.gets _.messages >>= \window → do
      let cursor = RD.toMaybe window <#> _.fromCursor
      updateMessages cursor Forward

  where
  timer val = do
    { emitter, listener } ← H.liftEffect HS.create
    _ ← H.liftAff $ Aff.forkAff $ forever do
      Aff.delay $ Milliseconds 5000.0
      H.liftEffect $ HS.notify listener val
    pure emitter

  updateMessages ∷ Maybe Cursor → Direction → _
  updateMessages cursor direction = do
    token ← Auth.token
    H.raiseError (Backend.messagesFromCursor cursor direction token)
      \{ prevCursor, nextCursor, items } → do
        H.modify_ \st → st
          { messages = case RD.toMaybe st.messages of
              Nothing →
                Success
                  case direction of
                    Forward →
                      { fromCursor: prevCursor
                      , toCursor: nextCursor
                      , items
                      }
                    Backward →
                      { fromCursor: nextCursor
                      , toCursor: prevCursor
                      , items
                      }
              Just prev →
                Success
                  case direction of
                    Forward →
                      { items: prev.items <> items
                      , fromCursor: prevCursor
                      , toCursor: nextCursor
                      }
                    Backward →
                      { items: items <> prev.items
                      , fromCursor: nextCursor
                      , toCursor: prevCursor
                      }
          }
        when (direction == Forward) updateScroll

  updateScroll = H.gets _.scrollMode >>= case _ of
    NotFollowing → pass
    Following → scrollToBottom

  messagesScrollInfo ∷ ∀ m. MonadEffect m ⇒ m (Maybe ScrollInfo)
  messagesScrollInfo = liftEffect do
    parent ← Web.window >>= document <#> toDocument >>> toNonElementParentNode
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

  scrollToBottom ∷ ∀ m. MonadEffect m ⇒ m Unit
  scrollToBottom = liftEffect $ messagesScrollInfo >>= traverse_
    \{ el, sheight } → setScrollTop sheight el

type ScrollInfo =
  { el ∷ Element
  , cheight ∷ Number
  , sheight ∷ Number
  , top ∷ Number
  }

type ElementId = String

{-




.... a b c d e f g h i j k l ....
          ^     
                ^     
                      ^     

C -> S: get next items, [ after cursor ].
S -> C: [items, cursor]
C -> S: get next items, after cursor.
...
C -> S: get next items, [ after cursor ].
S -> C: [items = Nil, cursor = X]
C -> S: get next items, after cursor.


------>
.... a b c d e f g h i j k l ....
                           ^     
                      ^     
                ^     

C -> S: get next items, direction = Backward, cursor = Nothing
S -> C: [items, cursor]
C -> S: get next items, direction = Backward, cursor 
S -> C: [items, cursor]
C -> S: get next items, direction = Backward, cursor 
S -> C: [items = [], cursor = Nothing]




S: .... a b c d e f g h i j k l ....
C: .... ........... g h i ..... ....
                   ^     ^
C: .... ........e f g h i ..... ....
                ^        ^

-}
