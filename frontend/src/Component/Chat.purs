module Component.Chat where

import Preamble

import AppM (App)
import Auth as Auth
import Backend as Backend
import Component.Chat.Controls as Controls
import Component.Chat.Messages as Messages
import Component.Chat.Users as Users
import Halogen.Extended as H
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP
import Type.Proxy (Proxy(..))

type State = Auth.Info

data Action = HandleBackendError Backend.Error

type Input = Auth.Info

type Output = Backend.Error

type ChildSlots =
  ( "users" ∷ ∀ query. H.Slot query Backend.Error Unit
  , "messages" ∷ ∀ query. H.Slot query Backend.Error Unit
  , "controls" ∷ ∀ query. H.Slot query Backend.Error Unit
  )

component ∷ ∀ q. H.Component q Input Output App
component =
  H.mkComponent
    { initialState: identity
    , render
    , eval: H.mkEval H.defaultEval { handleAction = handleAction }
    }
  where
  render authInfo =
    HH.div
      [ HP.classNames
          [ "grow"
          , "block"
          , "grid"
          , "grid-cols-chat"
          , "w-full"
          , "gap-x-1"
          , "grid-flow-col"
          ]
      ]
      [ HH.div
          [ HP.classNames
              [ "h-full"
              , "flex"
              , "flex-col"
              , "pl-2"
              ]
          ]
          [ slotMessages, slotControls ]
      , slotUsers
      ]
    where
    slotUsers =
      HH.slot _users unit Users.component authInfo HandleBackendError
    slotMessages =
      HH.slot _messages unit Messages.component authInfo HandleBackendError
    slotControls =
      HH.slot _controls unit Controls.component authInfo HandleBackendError
    _users =
      Proxy ∷ Proxy "users"
    _messages =
      Proxy ∷ Proxy "messages"
    _controls =
      Proxy ∷ Proxy "controls"

handleAction ∷ ∀ m. Action → H.HalogenM State Action ChildSlots Output m Unit
handleAction = case _ of
  HandleBackendError backendError → H.raise backendError
