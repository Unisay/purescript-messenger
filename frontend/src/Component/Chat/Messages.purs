module Component.Chat.Messages where

import Preamble

import AppM (App)
import Auth as Auth
import Backend as Backend
import Data.Message (Message)
import Halogen.Extended as H
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP

data Action = Initialize
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
render _state = HH.div
  [ HP.classNames
      [ "border-x-2"
      , "border-t-2"
      , "border-slate-400"
      , "w-full"
      , "bg-slate-200"
      , "h-4/5"
      , "rounded-t-sm"
      ]
  ]
  []

handleAction ∷ Action → H.HalogenM State Action () Output App Unit
handleAction = case _ of
  Initialize → do
    token ← H.gets _.auth.token
    H.raiseError (Backend.getLastMessages token) \messages →
      H.modify_ _ { messages = messages }
