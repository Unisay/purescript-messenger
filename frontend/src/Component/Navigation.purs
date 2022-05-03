module Component.Navigation
  ( component
  ) where

import Preamble

import AppM (App)
import AppM as App
import Auth as Auth
import Backend (deleteSession)
import Chat.Api.Http (SignoutReason(..))
import Control.Monad.Reader (asks)
import Data.Notification (useful)
import Data.Route (Route(..), goTo)
import Data.Route as Route
import Data.Username (Username)
import Data.Username as Username
import Halogen (liftEffect)
import Halogen.Extended as H
import Halogen.HTML.Events as HE
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP
import Halogen.Subscription as HS

type State =
  { route ∷ Route
  , auth ∷ Maybe Username
  }

type Input = Route

data Action = Initialize | SetRoute Route | SignedOut SignoutReason

component ∷ ∀ q. H.Component q Input App.Error App
component =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval $ H.defaultEval
        { initialize = Just Initialize
        , handleAction = handleAction
        , receive = Just <<< SetRoute
        }
    }

initialState ∷ Route → State
initialState route = { route, auth: Nothing }

render ∷ ∀ s m. State → H.ComponentHTML Action s m
render { route, auth } = HH.nav_
  [ HH.ul
      [ HP.classNames
          [ "bg-white"
          , "pt-4"
          , "pr-0"
          , "flex"
          , "justify-end"
          , "align-center"
          ]
      ]
      $
        [ HH.li [ HP.classNames [ "list-none", "ml-8", "mr-auto", "mt-8" ] ]
            [ HH.a
                [ HP.classNames
                    [ if route == Home then "overline"
                      else "no-underline"
                    , if route == Home then "text-blue-800"
                      else "text-black"
                    , "font-bold"
                    , "text-2xl"
                    ]
                , Route.href Home
                ]
                [ HH.text "PureMess" ]
            ]
        ]
      <>
        case auth of
          Nothing → [ SignIn, SignUp ] >>= \route' → pure $
            HH.li
              [ HP.classNames [ "list-none", "mr-16", "mt-8", "text-xl" ] ]
              [ HH.a
                  [ HP.classNames
                      [ if route == route' then "overline"
                        else "no-underline"
                      , if route == route' then "text-blue-800"
                        else "text-black"
                      ]
                  , Route.href route'
                  ]
                  [ HH.text $ show route' ]
              ]
          Just username →
            [ HH.li
                [ HP.classNames [ "list-none", "mr-16", "mt-8", "text-xl" ] ]
                [ HH.text $ Username.toString username ]
            , HH.li
                [ HP.classNames [ "list-none", "mr-16", "mt-8", "text-xl" ] ]
                [ HH.a [ Route.href Home, HE.onClick \_ → SignedOut UserAction ]
                    [ HH.text "SignOut" ]
                ]
            ]
  ]

handleAction ∷ ∀ s. Action → H.HalogenM State Action s App.Error App Unit
handleAction = case _ of
  Initialize → H.raiseErrors Auth.username App.AuthError \username → do
    H.modify_ _ { auth = username }
  SetRoute newRoute →
    H.raiseErrors Auth.username App.AuthError \username → do
      H.modify_ _ { route = newRoute, auth = username }
  SignedOut reason → do
    H.raiseErrors_ (deleteSession reason) App.BackendError
    listener ← asks _.notifications.listener
    liftEffect $ HS.notify listener $ useful "You successfully signed out!"
    H.modify_ _ { auth = Nothing }
    Auth.remove
    goTo Route.Home
