module Component.Chat where

import Preamble

import AppM (App)
import Auth as Auth
import Backend as Backend
import Chat.Api.Http (UserPresence)
import Component.ChatWindow as ChatWindow
import Component.Userlist as Userlist
import Halogen.Extended (OpaqueSlot)
import Halogen.Extended as H
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP
import Network.RemoteData (RemoteData)
import Network.RemoteData as RD
import Type.Proxy (Proxy(..))

type State =
  { users ∷ RemoteData Unit (Array UserPresence)
  , authInfo ∷ Auth.Info
  }

data Action = Initialize

type Input = Auth.Info

type Output = Backend.Error

type ChildSlots =
  ( userlist ∷ OpaqueSlot Unit
  , chatWindow ∷ OpaqueSlot Unit
  )

component ∷ ∀ q. H.Component q Input Output App
component =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval $ H.defaultEval
        { initialize = Just Initialize
        , handleAction = handleAction
        }
    }

initialState ∷ Auth.Info → State
initialState authInfo = { users: RD.NotAsked, authInfo }

handleAction
  ∷ Action → H.HalogenM State Action ChildSlots Backend.Error App Unit
handleAction Initialize = do
  H.modify_ _ { users = RD.Loading }
  token ← H.gets _.authInfo.token
  H.raiseError (Backend.listUsers token) \userPresenses →
    H.modify_ _ { users = RD.Success userPresenses }

render ∷ ∀ m. State → H.ComponentHTML Action ChildSlots m
render { users, authInfo } =
  HH.div
    [ HP.classNames
        [ "m-header"
        , "block"
        , "flex"
        , "gap-x-2"
        , "w-full"
        , "min-h-chatwindow"
        ]
    ]
    [ slotUserlist, slotChatWindow ]

  where
  slotUserlist = HH.slot_ _userlist unit Userlist.component $ RD.withDefault []
    users
  slotChatWindow = HH.slot_ _chatWindow unit ChatWindow.component authInfo

_userlist = Proxy ∷ Proxy "userlist"
_chatWindow = Proxy ∷ Proxy "chatWindow"
