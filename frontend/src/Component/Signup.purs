module Component.Signup where

import Prelude

import Backend (SignUpResponse(..), createAccount)
import Control.Error.Util (hush)
import Control.Monad.Except (runExceptT)
import Data.Array as Array
import Data.Array.NonEmpty (NonEmptyArray)
import Data.Array.NonEmpty as NEA
import Data.Either (Either(..), either, isLeft)
import Data.EitherR (flipEither)
import Data.Email as Email
import Data.Maybe (Maybe(..), maybe)
import Data.Newtype (wrap)
import Data.Password as Password
import Data.Username as Username
import Data.Validation (Validation)
import Effect.Aff.Class (class MonadAff)
import Halogen (liftEffect)
import Halogen as H
import Halogen.HTML.Events as HE
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP
import Web.Event.Event (Event)
import Web.Event.Event as Event

type State =
  { loading ∷ Boolean
  , username ∷ Validation Username.Username
  , password ∷ Validation Password.Password
  , email ∷ Validation Email.Email
  , response ∷ Maybe SignUpResponse
  }

data Action
  = SetUsername String
  | ValidateUsername
  | SetPassword String
  | ValidatePassword
  | SetEmail String
  | ValidateEmail
  | SubmitForm Event

initialState ∷ ∀ input. input → State
initialState _input =
  { loading: false
  , username: { inputValue: "", result: Nothing }
  , password: { inputValue: "", result: Nothing }
  , email: { inputValue: "", result: Nothing }
  , response: Nothing
  }

component
  ∷ ∀ query input output m. MonadAff m ⇒ H.Component query input output m
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
          [ "min-h-screen"
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
      , HP.classNames [ "mt-8", "space-y-6" ]
      ]
      [ HH.div [ HP.classNames [ "text-red-600" ] ]
          [ HH.text case state.response of
              Just SignedUp → "You successfully signed up!"
              Just (Unexpected str) → "Got an error: " <> str
              Just (AlreadyRegistered) →
                "This user has already been registered!"
              Nothing → ""
          ]
      , HH.div_ $ Array.concat
          [ [ HH.label
                [ HP.for "input-email", HP.classNames [ "font-bold" ] ]
                [ HH.text "Email" ]
            , HH.input
                [ HP.id "input-email"
                , HP.placeholder "Email"
                , HP.required true
                , HP.autocomplete true
                , HP.type_ HP.InputEmail
                , HP.value state.email.inputValue
                , HE.onValueInput SetEmail
                , HE.onBlur \_ → ValidateEmail
                , HP.classNames $
                    [ "appearance-none"
                    , "rounded"
                    , "relative"
                    , "block"
                    , "w-full"
                    , "px-3"
                    , "py-2"
                    , "border"
                    , "border-gray-300"
                    , "placeholder-gray-500"
                    , "text-gray-900"
                    , "focus-outline-none"
                    , "focus-ring-indigo-500"
                    , "focus-border-indigo-500"
                    , "focus-z-10"
                    , "sm-text-sm"
                    ] <>
                      if maybe false isLeft state.email.result then
                        errorClasses
                      else []
                ]
            ]

          , validationErrors state.email.result
          ]
      , HH.div_ $ Array.concat
          [ [ HH.label
                [ HP.for "input-username", HP.classNames [ "font-bold" ] ]
                [ HH.text "Username" ]
            , HH.input
                [ HP.id "input-username"
                , HP.required true
                , HP.autocomplete true
                , HP.placeholder "Username"
                , HP.value state.username.inputValue
                , HE.onValueInput SetUsername
                , HE.onBlur \_ → ValidateUsername
                , HP.classNames $
                    [ "appearance-none"
                    , "rounded"
                    , "relative"
                    , "block"
                    , "w-full"
                    , "px-3"
                    , "py-2"
                    , "border"
                    , "border-gray-300"
                    , "placeholder-gray-500"
                    , "text-gray-900"
                    , "focus-outline-none"
                    , "focus-ring-indigo-500"
                    , "focus-border-indigo-500"
                    , "focus-z-10"
                    , "sm-text-sm"
                    ] <>
                      if maybe false isLeft state.username.result then
                        errorClasses
                      else []
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
                , HP.placeholder "Password"
                , HP.required true
                , HP.autocomplete true
                , HP.type_ HP.InputPassword
                , HP.value state.password.inputValue
                , HE.onValueInput SetPassword
                , HE.onBlur \_ → ValidatePassword
                , HP.classNames $
                    [ "appearance-none"
                    , "rounded"
                    , "relative"
                    , "block"
                    , "w-full"
                    , "px-3"
                    , "py-2"
                    , "border"
                    , "border-gray-300"
                    , "placeholder-gray-500"
                    , "text-gray-900"
                    , "focus-outline-none"
                    , "focus-ring-indigo-500"
                    , "focus-border-indigo-500"
                    , "focus-z-10"
                    , "sm-text-sm"
                    ] <>
                      if maybe false isLeft state.password.result then
                        errorClasses
                      else []
                ]
            ]
          , validationErrors state.password.result
          ]
      , HH.div_
          [ HH.button
              [ HP.disabled state.loading
              , HP.type_ HP.ButtonSubmit
              , HP.classNames
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
                  , if state.loading then "bg-gray-500"
                    else "bg-indigo-600"
                  , if state.loading then "hover-bg-gray-600"
                    else "hover-bg-indigo-700"
                  , "focus-outline-none"
                  , "focus-ring-2"
                  , "focus-ring-offset-2"
                  , "focus-ring-indigo-500"
                  ]
              ]
              [ HH.span
                  [ HP.classNames
                      [ "left-0", "flex", "items-center", "pl-3" ]
                  ]
                  [ HH.text
                      if state.loading then "signupg up..." else "Sign Up"
                  ]
              ]
          ]
      ]

  errorClasses = [ "border-red-200", "border-2" ]

  validationErrors
    ∷ ∀ a
    . Maybe (Either (NonEmptyArray String) a)
    → Array (H.ComponentHTML Action () m)
  validationErrors = case _ of
    Nothing → []
    Just response →
      (flipEither >>> hush >>> Array.fromFoldable >>> flip bind NEA.toArray)
        response
        <#> \errorMessage → HH.div
          [ HP.classNames [ "text-red-800" ] ]
          [ HH.text errorMessage ]

handleAction
  ∷ ∀ input output m
  . MonadAff m
  ⇒ Action
  → H.HalogenM State Action input output m Unit
handleAction = case _ of
  SetUsername str → H.modify_ $ \state →
    state { username { inputValue = str } }
  SetPassword str → H.modify_ $ \state →
    state { password { inputValue = str } }
  SetEmail str → H.modify_ $ \state →
    state { email { inputValue = str } }
  ValidateUsername → do
    { username } ← H.get
    case Username.parse username.inputValue of
      Left errors → H.modify_ $ \state →
        state { username { result = pure $ Left errors } }
      Right username' → H.modify_ $ \state →
        state { username { result = pure $ Right username' } }
  ValidatePassword → do
    { password } ← H.get
    case Password.parse password.inputValue of
      Left err → H.modify_ $ \state →
        state { password { result = pure $ Left $ pure err } }
      Right password' → H.modify_ $ \state →
        state { password { result = pure $ Right password' } }
  ValidateEmail → do
    { email } ← H.get
    case Email.parse email.inputValue of
      Left err → H.modify_ $ \state →
        state { email { result = pure $ Left $ pure err } }
      Right email' → H.modify_ $ \state →
        state { email { result = pure $ Right email' } }
  SubmitForm ev → do
    liftEffect $ Event.preventDefault ev
    { email, username, password } ← H.get
    let pass = pure unit
    maybe pass (either (const pass) identity) $ runExceptT ado
      password ← wrap password.result
      username ← wrap username.result
      email ← wrap email.result
      in
        createAccount username password email >>= case _ of
          SignedUp → H.modify_ _ { response = Just SignedUp }
          AlreadyRegistered → H.modify_ _ { response = Just AlreadyRegistered }
          Unexpected str → H.modify_ _ { response = Just (Unexpected str) }

