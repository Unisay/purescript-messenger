module Component.Navigation
  ( component
  ) where

import Preamble

import AppM (App, hoistAppM)
import AppM as App
import Auth (getAuth, removeAuth)
import Backend (deleteSession)
import Chat.Api.Http (SignOutResponse(..), SignoutReason(..))
import Control.Monad.Reader (asks)
import Data.Auth.Token as Auth
import Data.Notification (critical, important, useful)
import Data.Route (Route(..), goTo)
import Data.Route as Route
import Halogen (lift, liftEffect)
import Halogen as H
import Halogen.HTML.Events as HE
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP
import Halogen.Subscription as HS

type State =
  { route ∷ Route
  , auth ∷ Maybe Auth.Token
  }

type Input = Route

data Action = Initialize | SetRoute Route | SignedOut SignoutReason

component ∷ ∀ q o. H.Component q Input o App
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

handleAction ∷ ∀ s o. Action → H.HalogenM State Action s o App Unit
handleAction = case _ of
  Initialize → getAuth >>= \token → H.modify_ _ { auth = token }
  SetRoute newRoute → do
    H.modify_ _ { route = newRoute }
    handleAction Initialize
  SignedOut reason → do
    response ← deleteSession reason # hoistAppM App.BackendError
      >>> lift
    notify ← lift (asks _.notifications.listener) <#> \listener →
      liftEffect <<< HS.notify listener
    case response of
      SignedOutUser → do
        removeAuth
        notify $ useful "You successfully signed out!"
        goTo Route.Home
      SignedOutTimeout → do
        removeAuth
        notify $ important
          "You were signed out due to inactivity. Please sign in again"
        goTo Route.SignIn
      Refused → notify $ critical
        "Unable to sign out. You may refresh the page or try again later"

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
      , HH.li
          [ HP.classNames [ "list-none", "mr-16", "mt-8", "text-xl" ] ]
          [ HH.a
              [ HP.classNames
                  [ if route == SignIn then "overline"
                    else "no-underline"
                  , if route == SignIn then "text-blue-800"
                    else "text-black"
                  ]
              , Route.href SignIn
              ]
              [ HH.text "SignIn" ]
          ]
      , HH.li [ HP.classNames [ "list-none", "mr-16", "mt-8", "text-xl" ] ]
          [ HH.a
              [ HP.classNames
                  [ if route == SignUp then "overline"
                    else "no-underline"
                  , if route == SignUp then "text-blue-800"
                    else "text-black"
                  ]
              , Route.href SignUp
              ]
              [ HH.text "SignUp" ]
          ]
      , HH.maybeElem auth \_token →
          HH.li [ HP.classNames [ "list-none", "mr-16", "mt-8", "text-xl" ] ]
            [ HH.a [ Route.href Home, HE.onClick \_ → SignedOut UserAction ]
                [ HH.text "Sign Out" ]
            ]
      ]
  ]

