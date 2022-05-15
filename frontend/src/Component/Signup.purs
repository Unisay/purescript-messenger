module Component.Signup where

import Preamble

import AppM (App)
import Backend as Backend
import Chat.Api.Http (SignUpResponse(..))
import Control.Monad.Except (runExceptT)
import Control.Monad.Reader (asks)
import Data.Array as Array
import Data.Array.NonEmpty (NonEmptyArray)
import Data.Either (isLeft)
import Data.Email as Email
import Data.Newtype (wrap)
import Data.Notification (important, useful)
import Data.Password as Password
import Data.Route (goTo)
import Data.Route as Route
import Data.Username as Username
import Data.Validation (Validation)
import Effect.Aff (Milliseconds(..), delay)
import Halogen (liftAff, liftEffect)
import Halogen.Extended as H
import Halogen.HTML.Events as HE
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP
import Halogen.Subscription as HS
import Network.RemoteData (RemoteData(..), isLoading)
import Web.Event.Event (Event)
import Web.Event.Event as Event

type State =
  { username ∷ Validation Username.Username
  , password ∷ Validation Password.Password
  , email ∷ Validation Email.Email
  , response ∷ RemoteData Unit SignUpResponse
  }

data Action
  = SetUsername String
  | ValidateUsername
  | SetPassword String
  | ValidatePassword
  | SetEmail String
  | ValidateEmail
  | SubmitForm Event

initialState ∷ ∀ i. i → State
initialState _input =
  { username: { inputValue: "", result: Nothing }
  , password: { inputValue: "", result: Nothing }
  , email: { inputValue: "", result: Nothing }
  , response: NotAsked
  }

component ∷ ∀ q i. H.Component q i Backend.Error App
component =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval $ H.defaultEval { handleAction = handleAction }
    }

render ∷ ∀ m. State → H.ComponentHTML Action () m
render state = signupFormContainer
  where
  signupFormContainer =
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
          [ HP.classNames
              [ "max-w-md"
              , "w-full"
              , "space-y-8"
              , "rounded"
              , "border"
              , "border-slate-300"
              , "p-5"
              , "shadow-xl"
              , "bg-white"
              , if state.response == Success AlreadyRegistered then
                  "animate-shake"
                else mempty
              , if isLoading state.response then "cursor-wait"
                else "cursor-default"
              ]
          ]
          [ signupFormHeader, signupForm ]
      ]

  signupFormHeader =
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
          [ HH.text "Create your account" ]
      ]
  signupForm =
    HH.form
      [ HP.id "form-username"
      , HE.onSubmit SubmitForm
      , HP.classNames
          [ "mt-8"
          , "space-y-6"
          ]
      ]
      [ HH.div_ $ Array.concat
          [ [ HH.label
                [ HP.for "i-email", HP.classNames [ "font-bold" ] ]
                [ HH.text "Email" ]
            , HH.input
                [ HP.id "i-email"
                , HP.disabled $ isLoading state.response
                , HP.placeholder "Email"
                , HP.required true
                , HP.autofocus true
                , HP.autocomplete HP.AutocompleteEmail
                , HP.type_ HP.InputEmail
                , HP.value state.email.inputValue
                , HE.onValueInput SetEmail
                , HE.onBlur \_ → ValidateEmail
                , HP.classNames
                    $
                      [ "appearance-none"
                      , "rounded"
                      , "relative"
                      , "placeholder:italic"
                      , "placeholder:gray-500"
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
                      , "sm:text-sm"
                      , "focus:cursor-text"
                      , "transition"
                      , "duration-100"
                      , if isLoading state.response then "cursor-wait"
                        else "cursor-pointer"
                      ]
                    <>
                      if maybe false isLeft state.email.result then
                        errorClasses
                      else [ "border-gray-300", "hover:border-gray-400" ]
                ]
            ]

          , validationErrors state.email.result
          ]
      , HH.div_ $ Array.concat
          [ [ HH.label
                [ HP.for "i-username", HP.classNames [ "font-bold" ] ]
                [ HH.text "Username" ]
            , HH.input
                [ HP.id "input-username"
                , HP.disabled $ isLoading state.response
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
                      , "placeholder:italic"
                      , "placeholder:gray-500"
                      , "w-full"
                      , "px-2"
                      , "py-2"
                      , "border"
                      , "text-gray-900"
                      , "focus:outline-none"
                      , "focus:ring-indigo-500"
                      , "focus:border-indigo-500"
                      , "focus:z-10"
                      , "sm:text-sm"
                      , "focus:cursor-text"
                      , "transition"
                      , "duration-100"
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
                , HP.autocomplete HP.AutocompleteNewPassword
                , HP.type_ HP.InputPassword
                , HP.value state.password.inputValue
                , HE.onValueInput SetPassword
                , HE.onBlur \_ → ValidatePassword
                , HP.classNames
                    $
                      [ "appearance-none"
                      , "rounded"
                      , "relative"
                      , "block"
                      , "placeholder:italic"
                      , "placeholder:gray-500"
                      , "w-full"
                      , "px-2"
                      , "py-2"
                      , "border"
                      , "text-gray-900"
                      , "focus:outline-none"
                      , "focus:ring-indigo-500"
                      , "focus:border-indigo-500"
                      , "focus:z-10"
                      , "sm:text-sm"
                      , "focus:cursor-text"
                      , "transition"
                      , "duration-100"
                      , if isLoading state.response then "cursor-wait"
                        else "cursor-pointer"
                      ]
                    <>
                      if maybe false isLeft state.password.result then
                        errorClasses
                      else
                        [ "border-gray-300", "hover:border-gray-400" ]
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
                      , "hover-bg-gray-600"
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
                  if isLoading state.response then "Signing up..."
                  else "Sign Up"
              ]
          ]
      ]

  errorClasses = [ "border-red-200", "border-2", "hover:border-red-300" ]

  validationErrors
    ∷ ∀ a
    . Maybe (Either (NonEmptyArray String) a)
    → Array (H.ComponentHTML Action () m)
  validationErrors = case _ of
    Just (Left errs) → Array.fromFoldable errs <#> \errorMessage →
      HH.div [ HP.classNames [ "text-red-800" ] ] [ HH.text errorMessage ]
    _ → []

handleAction ∷ ∀ i. Action → H.HalogenM State Action i Backend.Error App Unit
handleAction = case _ of
  SetUsername str → H.modify_ _ { username { inputValue = str } }
  SetPassword str → H.modify_ _ { password { inputValue = str } }
  SetEmail str → H.modify_ _ { email { inputValue = str } }
  ValidateUsername → do
    { username } ← H.get
    case Username.parse username.inputValue of
      Left errors → H.modify_ _ { username { result = pure $ Left errors } }
      Right username' → H.modify_ _
        { username { result = pure $ Right username' } }
  ValidatePassword → do
    { password } ← H.get
    case Password.parse password.inputValue of
      Left err → H.modify_ _ { password { result = pure $ Left $ pure err } }
      Right password' → H.modify_ _
        { password { result = pure $ Right password' } }
  ValidateEmail → do
    { email } ← H.get
    case Email.parse email.inputValue of
      Left _err → H.modify_ $ \state → do
        let err = "Not a valid email"
        state { email { result = pure $ Left $ pure err } }
      Right email' → H.modify_ _ { email { result = pure $ Right email' } }
  SubmitForm ev → do
    liftEffect $ Event.preventDefault ev
    { email, username, password } ← H.get
    let pass = pure unit
    maybe pass (either (const pass) identity) $ runExceptT ado
      password ← wrap password.result
      username ← wrap username.result
      email ← wrap email.result
      in
        do
          H.modify_ _ { response = Loading }
          liftAff $ delay $ Milliseconds 500.0
          notify ← asks _.notifications.listener <#> \listener →
            HS.notify listener >>> liftEffect
          H.raiseError (Backend.createAccount username password email)
            \response → do
              H.modify_ _ { response = Success response }
              case response of
                SignedUp → do
                  goTo Route.SignIn
                  notify $ useful "You successfully created your account!"
                AlreadyRegistered →
                  notify $ important "User already registered"
