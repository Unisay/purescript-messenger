module Component.Navigation
  ( component
  , Output(..)
  ) where

import Preamble

import AppM (App)
import AppM as App
import Auth (Info(..))
import Auth as Auth
import Chat.Api.Http (SignoutReason(..))
import Control.Monad.Reader (asks)
import Data.Notification (useful)
import Data.Route (Route(..))
import Data.Route as Route
import Data.Username as Username
import Halogen.Extended as H
import Halogen.HTML.Events as HE
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP
import Halogen.Subscription as HS

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
    { initialState: identity
    , render
    , eval: H.mkEval $ H.defaultEval
        { handleAction = handleAction
        , receive = Just <<< UpdateState
        }
    }

render ∷ ∀ m. State → H.ComponentHTML Action () m
render { route, authInfo } = HH.nav_
  [ HH.ul
      [ HP.classNames
          [ "bg-white"
          , "top-0"
          , "pr-0"
          , "pt-2"
          , "flex"
          , "justify-end"
          , "align-center"
          , "w-full"
          , "sticky"
          , "h-20"
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
                    , "transition"
                    , "duration-50"
                    , "hover:text-blue-800"
                    , "focus:text-blue-800"
                    , "active:text-blue-700"
                    ]
                , Route.href Home
                ]
                [ HH.text "PureMess" ]
            ]
        ]
      <> headerActions

  ]
  where
  headerActions = case authInfo of
    Nothing → anonymousActions
    Just Anonymous → anonymousActions
    Just (Authenticated user) →
      [ HH.li
          [ HP.classNames [ "list-none", "mr-16", "mt-8", "text-xl" ] ]
          [ HH.text $ Username.toString user.name ]
      , HH.li
          [ HP.classNames [ "list-none", "mr-16", "mt-9", "text-xl" ] ]
          [ HH.a
              [ Route.href Home
              , HE.onClick \_ → SignOut UserAction
              , HP.classNames [ "block" ]
              ]
              [ HH.img
                  [ HP.src "images/signout.svg"
                  , HP.classNames
                      [ "h-6"
                      , "w-6"
                      , "transition"
                      , "duration-100"
                      , "hover:scale-110"
                      , "active:scale-125"
                      , "stroke-current"
                      , "hover:stroke-blue-800"
                      , "stroke-2"
                      , "fill-transparent"
                      ]
                  ]
              ]
          ]
      ]
  anonymousActions = [ SignIn, SignUp ] >>= \route' → pure $
    HH.li
      [ HP.classNames [ "list-none", "mr-16", "mt-8", "text-xl" ] ]
      [ HH.a
          [ HP.classNames
              [ if route == route' then "overline"
                else "decoration-transparent"
              , if route == route' then "text-blue-800"
                else "text-black"
              , "transition"
              , "duration-50"
              , "hover:text-blue-800"
              , "active:text-blue-600"
              ]
          , Route.href route'
          ]
          [ HH.text $ show route' ]
      ]

handleAction ∷ ∀ s. Action → H.HalogenM State Action s Output App Unit
handleAction = case _ of
  UpdateState newState →
    H.put newState
  SignOut reason → do

    -- H.gets _.authInfo >>= case _ of
    --   Nothing → H.raise $ OutputError $ App.AuthError Auth.TokenIsMissing
    --   Just { username, token } → do
    --     H.raiseErrors_ (deleteSession username token reason)
    --       (App.BackendError >>> OutputError)
    listener ← asks _.notifications.listener
    liftEffect $ HS.notify listener $ useful "You successfully signed out!"
    H.modify_ _ { authInfo = Nothing }
    --     Auth.removeToken *>
    H.raise SignedOut
