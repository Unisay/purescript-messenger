module Component.Signin where

import Preamble

import AppM (App)
import Auth as Auth
import Backend (SignInResponse(..))
import Backend as Backend
import Control.Monad.Error.Class (throwError)
import Control.Monad.Except.Trans (runExceptT)
import Control.Monad.Reader (asks)
import Data.Array as Array
import Data.Array.NonEmpty (NonEmptyArray)
import Data.Auth.Token (Token)
import Data.Either (isLeft)
import Data.Newtype (wrap)
import Data.Notification (important, useful)
import Data.Password (Password)
import Data.Password as Password
import Data.Route (Route(..), goTo)
import Data.Route as Route
import Data.Username (Username)
import Data.Username as Username
import Data.Validation (Validation)
import Effect.Aff (Milliseconds(..), delay)
import Effect.Aff.Class (liftAff)
import Halogen.Extended as H
import Halogen.HTML.Events as HE
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP
import Halogen.Subscription as HS
import Network.RemoteData (RemoteData(..), isLoading)
import Web.Event.Event (Event)
import Web.Event.Event as Event

type State =
  { username ∷ Validation Username
  , password ∷ Validation Password
  , response ∷ RemoteData Unit Backend.SignInResponse
  }

type Input = Unit

type Output = Either Backend.Error Token

data Action
  = Initialize
  | SetUsername String
  | ValidateUsername
  | SetPassword String
  | ValidatePassword
  | SubmitForm Event

component ∷ ∀ q. H.Component q Input Output App
component =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval $ H.defaultEval
        { handleAction = handleAction
        , initialize = Just Initialize
        }
    }

initialState ∷ Input → State
initialState _ =
  { username: { inputValue: "", result: Nothing }
  , password: { inputValue: "", result: Nothing }
  , response: NotAsked
  }

render ∷ ∀ m. State → H.ComponentHTML Action () m
render state = signinFormContainer
  where
  signinFormContainer =
    HH.div
      [ HP.classNames
          [ "grow"
          , "flex"
          , "items-center"
          , "justify-center"
          , "bg-gray-50"
          ]
      ]
      [ HH.div
          [ HP.classNames $
              [ "max-w-md"
              , "w-full"
              , "space-y-8"
              , "rounded"
              , "border"
              , "border-slate-300"
              , "p-5"
              , "shadow-xl"
              , "bg-white"
              , if state.response == Success Forbidden then "animate-shake"
                else mempty
              , if isLoading state.response then "cursor-wait"
                else "cursor-default"
              ]
          ]
          [ signinFormHeader, signinForm ]
      ]

  signinFormHeader =
    HH.div_
      [ HH.h2
          [ HP.classNames
              [ "mt-6"
              , "text-center"
              , "text-3-xl"
              , "font-extrabold"
              , "text-gray-900"
              ]
          ]
          [ HH.text "Sign in to your account" ]
      ]
  signinForm =
    HH.form
      [ HP.id "form-username"
      , HE.onSubmit SubmitForm
      , HP.classNames [ "mt-8", "space-y-6" ]
      ]
      [ HH.div_ $ Array.concat
          [ [ HH.label
                [ HP.for "input-username", HP.classNames [ "font-bold" ] ]
                [ HH.text "Username" ]
            , HH.input
                [ HP.id "input-username"
                , HP.disabled $ isLoading state.response
                , HP.autofocus true
                , HP.required true
                , HP.autocomplete HP.AutocompleteUsername
                , HP.placeholder "Username"
                , HP.value state.username.inputValue
                , HE.onValueInput SetUsername
                , HE.onBlur \_ → ValidateUsername
                , HP.classNames
                    $
                      [ "appearance-none"
                      , "rounded"
                      , "relative"
                      , "block"
                      , "w-full"
                      , "px-2"
                      , "py-2"
                      , "border"
                      , "placeholder:gray-500"
                      , "placeholder:italic"
                      , "text-gray-900"
                      , "focus:outline-none"
                      , "focus:ring-indigo-500"
                      , "focus:border-indigo-500"
                      , "focus:z-10"
                      , "sm:text-sm"
                      , "transition"
                      , "duration-100"
                      , "focus:cursor-text"
                      , if isLoading state.response then "cursor-wait"
                        else "cursor-pointer"
                      ]
                    <>
                      if maybe false isLeft state.username.result then
                        errorClasses
                      else [ "border-gray-300", "hover:border-gray-400" ]
                ]
            ]
          , validationErrors state.username.result
          ]
      , HH.div_ $ Array.concat
          [ [ HH.label
                [ HP.for "input-password", HP.classNames [ "font-bold" ] ]
                [ HH.text "Password" ]
            , HH.input
                [ HP.id "input-password"
                , HP.disabled $ isLoading state.response
                , HP.placeholder "Password"
                , HP.required true
                , HP.autocomplete HP.AutocompleteCurrentPassword
                , HP.type_ HP.InputPassword
                , HP.value state.password.inputValue
                , HE.onValueInput SetPassword
                , HE.onBlur \_ → ValidatePassword
                , HP.classNames
                    $
                      [ "appearance-none"
                      , "placeholder:italic"
                      , "placeholder:gray-500"
                      , "rounded"
                      , "relative"
                      , "block"
                      , "w-full"
                      , "px-2"
                      , "py-2"
                      , "border"
                      , "text-gray-900"
                      , "focus:outline-none"
                      , "focus:ring-indigo-500"
                      , "focus:border-indigo-500"
                      , "focus:z-10"
                      , "sm-text-sm"
                      , "focus:cursor-text"
                      , "transition"
                      , "duration-100"
                      , if isLoading state.response then "cursor-wait"
                        else "cursor-pointer"
                      ]
                    <>
                      if maybe false isLeft state.password.result then
                        errorClasses
                      else [ "border-gray-300", "hover:border-gray-400" ]
                ]
            ]
          , validationErrors state.password.result
          ]
      , HH.div_
          [ HH.input
              [ HP.disabled $ isLoading state.response
              , HP.type_ HP.InputSubmit
              , HP.classNames
                  $
                    [ "group"
                    , "w-full"
                    , "flex"
                    , "justify-center"
                    , "py-2"
                    , "px-4"
                    , "border"
                    , "border-transparent"
                    , "text-sm"
                    , "font-medium"
                    , "rounded-md"
                    , "text-white"
                    , "focus:outline-none"
                    , "focus:ring-2"
                    , "focus:ring-offset-2"
                    , "focus:ring-indigo-500"
                    ]
                  <>
                    if isLoading state.response then
                      [ "bg-gray-500"
                      , "cursor-wait"
                      ]
                    else
                      [ "bg-indigo-600"
                      , "hover:bg-indigo-700"
                      , "active:bg-indigo-800"
                      , "transition"
                      , "duration-200"
                      , "cursor-pointer"
                      , "hover:scale-101"
                      ]
              , HP.value $
                  if isLoading state.response then "Signing in..."
                  else "Sign In"
              ]
          ]

      ]

  errorClasses = [ "border-red-200", "border-2" ]

  validationErrors
    ∷ ∀ a
    . Maybe (Either (NonEmptyArray String) a)
    → Array (H.ComponentHTML Action () m)
  validationErrors = case _ of
    Just (Left errs) → Array.fromFoldable errs <#> \errorMessage →
      HH.div [ HP.classNames [ "text-red-800" ] ] [ HH.text errorMessage ]
    _ → []

handleAction ∷ ∀ s. Action → H.HalogenM State Action s Output App Unit
handleAction = case _ of
  Initialize →
    whenM (Auth.loadToken <#> isJust) (goTo Chat)
  SetUsername str → H.modify_ _ { username { inputValue = str } }
  SetPassword str → H.modify_ _ { password { inputValue = str } }
  ValidateUsername → do
    { username } ← H.get
    case Username.parse username.inputValue of
      Left errors → H.modify_ _ { username { result = pure $ Left errors } }
      Right username' →
        H.modify_ _ { username { result = pure $ Right username' } }
  ValidatePassword → do
    { password } ← H.get
    case Password.parse password.inputValue of
      Left err → H.modify_ _ { password { result = pure $ Left $ pure err } }
      Right password' →
        H.modify_ _ { password { result = pure $ Right password' } }
  SubmitForm ev → do
    liftEffect $ Event.preventDefault ev
    { password, username } ← H.get
    maybe pass (either (const pass) identity) $ runExceptT ado
      password ← wrap password.result
      username ← wrap username.result
      in
        do
          H.modify_ _ { response = Loading }
          liftAff $ delay $ Milliseconds 500.0
          H.raiseErrors (Backend.createSession username password) throwError
            \response → do
              H.modify_ _ { response = Success response }
              notify ← asks _.notifications.listener <#> \listener →
                HS.notify listener >>> liftEffect
              case response of
                Backend.Forbidden → notify
                  $ important "Incorrect username or password!"
                Backend.SignedIn token → do
                  Auth.saveToken token
                  H.raise $ Right token
                  goTo Route.Chat
                  notify $ useful "Welcome to the chat!"
