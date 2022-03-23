module Component.Signin where

import Prelude

import Backend (SignInResponse(..))
import Backend as Backend
import Control.Monad.Except.Trans (runExceptT)
import Data.Array as Array
import Data.Array.NonEmpty (NonEmptyArray)
import Data.Array.NonEmpty as NEA
import Data.Either (Either(..), either, hush, isLeft)
import Data.EitherR (flipEither)
import Data.Maybe (Maybe(..), maybe)
import Data.Newtype (unwrap, wrap)
import Data.Notification (Notification, critical)
import Data.Password (Password)
import Data.Password as Password
import Data.String (length)
import Data.Username (Username)
import Data.Username as Username
import Data.Validation (Validation)
import Effect.Aff.Class (class MonadAff)
import Effect.Class.Console (log)
import Halogen (liftEffect)
import Halogen as H
import Halogen.HTML.Events as HE
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP
import Halogen.Subscription as HS
import Web.Event.Event (Event)
import Web.Event.Event as Event

type State =
  { loading ∷ Boolean
  , notifications ∷ HS.Listener Notification
  , username ∷ Validation Username
  , password ∷ Validation Password
  , response ∷ Maybe SignInResponse
  }

type Input = HS.Listener Notification

data Action
  = SetUsername String
  | ValidateUsername
  | SetPassword String
  | ValidatePassword
  | SubmitForm Event

component
  ∷ ∀ query output m. MonadAff m ⇒ H.Component query Input output m
component =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval $ H.defaultEval { handleAction = handleAction }
    }

initialState ∷ Input → State
initialState notifications =
  { loading: false
  , notifications
  , username: { inputValue: "", result: Nothing }
  , password: { inputValue: "", result: Nothing }
  , response: Nothing
  }

render ∷ ∀ m. State → H.ComponentHTML Action () m
render state = signinFormContainer
  where
  signinFormContainer =
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
      [ HH.div [ HP.classNames [ "text-red-600" ] ]
          [ HH.text case state.response of
              Just (SignedIn _) → "You successfully signed in!"
              Just Forbidden → "Incorrect username or password!"
              Just (Failure str) → "Got an error: " <> str
              Nothing → ""
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
                  [ HP.classNames [ "left-0", "flex", "items-center", "pl-3" ] ]
                  [ HH.text
                      if state.loading then "Signing in..." else "Sign In"
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
  ∷ ∀ slots output m
  . MonadAff m
  ⇒ Action
  → H.HalogenM State Action slots output m Unit
handleAction = case _ of
  SetUsername str → H.modify_ $ \state →
    state { username { inputValue = str } }
  SetPassword str → H.modify_ $ \state →
    state { password { inputValue = str } }
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
  SubmitForm ev → do
    liftEffect $ Event.preventDefault ev
    { password, username } ← H.get
    let pass = pure unit
    maybe pass (either (const pass) identity) $ runExceptT ado
      password ← wrap password.result
      username ← wrap username.result
      in
        Backend.createSession username password >>= case _ of
          SignedIn token → do
            H.modify_ _ { response = Just (SignedIn token) }
            log $ "Received a token: " <> show (length (unwrap token))
          Forbidden →
            H.modify_ _ { response = Just Forbidden }
          Failure str → do
            { notifications } ← H.get
            liftEffect $ HS.notify notifications (critical str)

