module Component.Navigation
  ( component
  , Query(..)
  ) where

import Preamble

import AppM (App, Error(..))
import AppM as App
import Auth as Auth
import Backend (deleteSession)
import Chat.Api.Http (SignoutReason(..))
import Control.Monad.Reader (asks)
import Data.Notification (useful)
import Data.Route (Route(..), goTo)
import Data.Route as Route
import Data.Username as Username
import Halogen (liftEffect)
import Halogen.Extended as H
import Halogen.HTML.Events as HE
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP
import Halogen.Subscription as HS
import Svg.Renderer.Halogen (icon)

type State =
  { route ∷ Route
  , auth ∷ Maybe Auth.Info
  }

type Input = Route

data Action = Initialize | SetRoute Route | SignOut SignoutReason

data Query a = SetAuth Auth.Info a

component ∷ H.Component Query Input App.Error App
component =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval $ H.defaultEval
        { initialize = Just Initialize
        , handleAction = handleAction
        , handleQuery = handleQuery
        , receive = Just <<< SetRoute
        }
    }

initialState ∷ Input → State
initialState route = { route, auth: Nothing }

render ∷ ∀ m. State → H.ComponentHTML Action () m
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
        case auth <#> _.username of
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
                [ HH.a [ Route.href Home, HE.onClick \_ → SignOut UserAction ]
                    [ icon
                        """
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        """
                        []
                    ]
                ]
            ]
  ]

handleQuery ∷ ∀ s o a. Query a → H.HalogenM State Action s o App (Maybe a)
handleQuery (SetAuth info a) = do
  log "nav is handling query"
  H.modify_ _ { auth = Just info } $> Just a

handleAction ∷ ∀ s. Action → H.HalogenM State Action s App.Error App Unit
handleAction = case _ of
  Initialize → H.raiseErrors Auth.loadInfo App.AuthError \info →
    H.modify_ _ { auth = info }
  SetRoute newRoute →
    H.modify_ _ { route = newRoute }
  SignOut reason → do
    H.raiseErrors Auth.loadInfo AuthError \v → H.modify_ _ { auth = v }
    H.gets _.auth >>= case _ of
      Nothing → H.raise $ App.AuthError Auth.TokenIsMissing
      Just { username, token } → do
        H.raiseErrors_ (deleteSession username token reason) App.BackendError
        listener ← asks _.notifications.listener
        liftEffect $ HS.notify listener $ useful "You successfully signed out!"
        H.modify_ _ { auth = Nothing }
        Auth.removeToken
        goTo Route.Home
