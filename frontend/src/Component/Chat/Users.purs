module Component.Chat.Users where

import Preamble

import AppM (App)
import Auth as Auth
import Backend as Backend
import Chat.Api.Http (UserPresence)
import Chat.Presence (Presence(..))
import Control.Monad.Rec.Class (forever)
import Data.Array as Array
import Data.Username as Username
import Effect.Aff (Milliseconds(..))
import Effect.Aff as Aff
import Halogen.Extended as H
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP
import Halogen.Subscription as HS
import Network.RemoteData (RemoteData)
import Network.RemoteData as RD

data Action = Initialize | ReceiveInput Input | Tick

type Input = Auth.User

type Output = Backend.Error

type State =
  { user ∷ Auth.User
  , users ∷ RemoteData Unit (Array UserPresence)
  }

component ∷ ∀ q. H.Component q Input Output App
component =
  H.mkComponent
    { initialState: \user → { user, users: RD.NotAsked }
    , render
    , eval: H.mkEval $ H.defaultEval
        { handleAction = handleAction
        , receive = ReceiveInput >>> Just
        , initialize = Just Initialize
        }
    }

render ∷ ∀ m. State → H.ComponentHTML Action () m
render { users } =
  HH.div
    [ HP.classNames
        [ "flex"
        , "block"
        , "flex-col"
        , "bg-slate-200"
        , "opacity-90"
        , "rounded-b-md"
        , "border-r"
        , "border-y"
        , "border-slate-300"
        , "pr-2"
        , "w-40"
        , "h-fit"
        , "min-w-fit"
        , "row-span-full"
        , "shadow-md"
        , "cursor-default"
        , "rounded-tr-sm"
        ]
    ]
    [ case users of
        RD.Success loadedUsers →
          HH.ul [ HP.classNames [ "w-full", "p-2" ] ]
            $ map renderUsers (Array.sortWith _.presence loadedUsers)
        RD.NotAsked →
          HH.text "To be loaded."
        RD.Loading →
          HH.text "Loading..."
        RD.Failure _ →
          HH.text "Not Loaded. Please refresh."
    ]

  where
  renderUsers ∷ UserPresence → HH.ComponentHTML Action () m
  renderUsers st =
    HH.li
      [ HP.classNames [ "flex", "flex-row" ] ]
      [ HH.div
          [ HP.classNames
              [ "flex"
              , "flex-row"
              , "h-fit"
              , "items-center"
              , "cursor-pointer"
              ]
          ]
          [ HH.span
              [ HP.classNames
                  $
                    [ "text-lg"
                    , "font-medium"
                    ]
                  <>
                    if st.presence == Online then
                      [ "text-green-700", "hover:text-green-800" ]
                    else [ "text-slate-600", "hover:text-slate-700" ]
              ]
              [ HH.text $ Username.toString st.username ]
          ]
      ]

handleAction ∷ ∀ s. Action → H.HalogenM State Action s Output App Unit
handleAction = case _ of
  Initialize → do
    _ ← timer Tick >>= H.subscribe
    H.modify_ _ { users = RD.Loading }
    updateUsers
  ReceiveInput user →
    H.modify_ _ { user = user }
  Tick →
    updateUsers
  where
  timer val = do
    { emitter, listener } ← H.liftEffect HS.create
    _ ← H.liftAff $ Aff.forkAff $ forever do
      Aff.delay $ Milliseconds 1000.0
      H.liftEffect $ HS.notify listener val
    pure emitter

  updateUsers = do
    H.raiseError (Backend.listUsers =<< Auth.token) \userPresenses →
      H.modify_ _ { users = RD.Success userPresenses }
