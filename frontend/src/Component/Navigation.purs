module Component.Navigation
  ( component
  , Output(..)
  ) where

import Preamble

import AppM (App)
import AppM as App
import Auth as Auth
import Backend (deleteSession)
import Chat.Api.Http (SignoutReason(..))
import Control.Monad.Reader (asks)
import Data.Notification (useful)
import Data.Route (Route(..))
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
  , authInfo ∷ Maybe Auth.Info
  }

type Input = State

data Output = OutputError App.Error | SignedOut

data Action = UpdateState State | SignOut SignoutReason

component ∷ ∀ q. H.Component q Input Output App
component =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval $ H.defaultEval
        { handleAction = handleAction
        , receive = Just <<< UpdateState
        }
    }

initialState ∷ Input → State
initialState = identity

render ∷ ∀ m. State → H.ComponentHTML Action () m
render { route, authInfo } = HH.nav_
  [ HH.ul
      [ HP.classNames
          [ "bg-white"
          , "fixed"
          , "pt-4"
          , "pr-0"
          , "flex"
          , "justify-end"
          , "align-center"
          , "w-full"
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
        case authInfo <#> _.username of
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
                        <svg xmlns="http://www.w3.org/2000/svg"
                             class="h-6 w-6" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor"
                             stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3
                            3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        """
                        []
                    ]
                ]
            ]
  ]

handleAction ∷ ∀ s. Action → H.HalogenM State Action s Output App Unit
handleAction = case _ of
  UpdateState newState →
    H.put newState
  SignOut reason → do
    H.gets _.authInfo >>= case _ of
      Nothing → H.raise $ OutputError $ App.AuthError Auth.TokenIsMissing
      Just { username, token } → do
        H.raiseErrors_ (deleteSession username token reason)
          (OutputError <<< App.BackendError)
        listener ← asks _.notifications.listener
        liftEffect $ HS.notify listener $ useful "You successfully signed out!"
        H.modify_ _ { authInfo = Nothing }
        Auth.removeToken
        H.raise SignedOut
-- goTo Route.Home
