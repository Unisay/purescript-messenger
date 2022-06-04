module Component.Chat.Messages where

import Preamble

import AppM (App)
import Auth (Info) as Auth
import Backend as Backend
import Control.Monad.Rec.Class (forever)
import Data.Formatter.DateTime (format)
import Data.Formatter.DateTime as F
import Data.List (List(..), (:))
import Data.Message (Message(..))
import Data.String as String
import Data.String.NonEmpty as NES
import Data.Username as Username
import Effect.Aff (Milliseconds(..))
import Effect.Aff as Aff
import Halogen.Extended as H
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP
import Halogen.Subscription as HS

data Action = Initialize | Tick

type Input = Auth.Info

type Output = Backend.Error

type State =
  { auth ∷ Auth.Info
  , messages ∷ Array Message
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
initialState auth = { auth, messages: [] }

render ∷ ∀ m. State → H.ComponentHTML Action () m
render state = HH.div
  [ HP.classNames
      [ "border-x-2"
      , "border-t-2"
      , "border-slate-400"
      , "bg-slate-200"
      , "rounded-t-sm"
      , "overflow-y-scroll"
      , "h-messages"
      , "flex-none"
      , "pl-2"
      , "pr-1"
      ]
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
  Tick → updateMessages
  where
  updateMessages = do
    token ← H.gets _.auth.token
    H.raiseError (Backend.getLastMessages token) \messages →
      H.modify_ _ { messages = messages }

  timer val = do
    { emitter, listener } ← H.liftEffect HS.create
    _ ← H.liftAff $ Aff.forkAff $ forever do
      Aff.delay $ Milliseconds 1000.0
      H.liftEffect $ HS.notify listener val
    pure emitter
