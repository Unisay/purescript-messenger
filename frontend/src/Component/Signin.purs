module Component.Signin where

import Prelude

import Affjax (defaultRequest, printError, request) as AX
import Affjax.RequestBody (RequestBody(..)) as AX
import Data.Argonaut.Encode (encodeJson) as Json
import Data.Array as Array
import Data.Either (Either(..))
import Data.HTTP.Method (Method(..))
import Data.Maybe (Maybe(..))
import Data.Newtype (unwrap)
import Data.Password (Password)
import Data.Password as Password
import Data.Username (Username)
import Data.Username as Username
import Effect (Effect)
import Effect.Aff.Class (class MonadAff)
import Effect.Class.Console (log)
import Halogen (liftAff, liftEffect)
import Halogen as H
import Halogen.Aff (awaitBody, runHalogenAff)
import Halogen.HTML.Events as HE
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP
import Halogen.VDom.Driver (runUI)
import Web.Event.Event (Event)
import Web.Event.Event as Event

main :: Effect Unit
main =
  runHalogenAff do
    body <- awaitBody
    runUI component unit body

type State
  =
  { loading :: Boolean
  , usernameValue :: String
  , usernameValidationErrors :: Array String
  , passwordValue :: String
  , passwordValidationErrors :: Array String
  , result :: Maybe String
  }

data Action
  = SetUsername String
  | SetPassword String
  | SubmitForm Event

component
  :: forall query input output m. MonadAff m => H.Component query input output m
component =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval $ H.defaultEval { handleAction = handleAction }
    }

initialState :: forall input. input -> State
initialState _input =
  { loading: false
  , usernameValue: ""
  , usernameValidationErrors: []
  , passwordValue: ""
  , passwordValidationErrors: []
  , result: Nothing
  }

render :: forall m. State -> H.ComponentHTML Action () m
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
      , HP.classNames [ "mt-8" ]
      ]
      [ HH.div
          [ HP.classNames [ "rounded-md", "shadow-sm", "space-y-6" ] ]
          [ HH.div_ $ Array.concat
              [ [ HH.label
                    [ HP.for "input-username", HP.classNames [ "font-bold" ] ]
                    [ HH.text "Username" ]
                , HH.input
                    [ HP.id "input-username"
                    , HP.required true
                    , HP.autocomplete true
                    , HP.placeholder "Username"
                    , HP.value state.usernameValue
                    , HE.onValueInput SetUsername
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
                        ] <> validationClasses (Array.null state.usernameValidationErrors)
                    ]
                ]
              , state.usernameValidationErrors <#> \errorMessage ->
                  HH.div [ HP.classNames [ "text-red-800" ] ] [ HH.text errorMessage ]
              ]
          , HH.div_ $ Array.concat
              [ [ HH.label [ HP.for "input-password" ] [ HH.text "Password " ]
                , HH.input
                    [ HP.id "input-password"
                    , HP.placeholder "Password"
                    , HP.required true
                    , HP.autocomplete true
                    , HP.type_ HP.InputPassword
                    , HP.value state.passwordValue
                    , HE.onValueInput SetPassword
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
                        ] <> validationClasses (Array.null state.passwordValidationErrors)
                    ]
                ]
              , ( state.passwordValidationErrors <#> \errorMessage ->
                    HH.div [ HP.classNames [ "text-red-800" ] ] [ HH.text errorMessage ]
                ) :: Array _
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
      ]

  validationClasses :: Boolean -> Array String
  validationClasses b = if b then [] else [ "border-red-200", "border-2" ]

handleAction
  :: forall input output m
   . MonadAff m
  => Action
  -> H.HalogenM State Action input output m Unit
handleAction = case _ of
  SetUsername str -> H.modify_ _ { usernameValue = str }
  SetPassword str -> H.modify_ _ { passwordValue = str }
  SubmitForm ev -> do
    liftEffect $ Event.preventDefault ev
    { usernameValue, passwordValue } <- H.get
    case Username.parse usernameValue of
      Nothing ->
        H.modify_ _ { usernameValidationErrors = pure "Invalid Username" }
      Just username -> do
        H.modify_ _ { usernameValidationErrors = [] }
        case Password.parse passwordValue of
          Left err -> H.modify_ _ { passwordValidationErrors = [ err ] }
          Right password -> do
            H.modify_ _ { passwordValidationErrors = [], loading = true }
            signInResponse <- createSession username password
            H.modify_ _ { loading = false }
            case signInResponse of
              SignedIn -> log "Successfully signed in"
              Forbidden -> log "Forbidden"
              Failure err -> log $ "Sign in failed: " <> err

data SignInResponse
  = SignedIn
  | Forbidden
  | Failure String

instance Show SignInResponse where
  show = case _ of
    SignedIn -> "Signed In"
    Forbidden -> "Sign in is forbidden"
    Failure statusCode -> "Failure: " <> show statusCode

createSession
  :: forall m. MonadAff m => Username -> Password -> m SignInResponse
createSession username password = do
  log "Form is being submitted...."
  response <- liftAff $
    AX.request
      AX.defaultRequest
        { method = Left PUT
        , url = "http://localhost:8081/users/" <> Username.toString username <> "/session"
        , content = Just $ AX.Json $ Json.encodeJson { username, password }
        }
  let
    serverResponse =
      case response of
        Left err -> Failure (AX.printError err)
        Right { status } ->
          case unwrap status of
            200 -> SignedIn
            403 -> Forbidden
            _ -> Failure (show status)

  log ("Received server response: " <> show serverResponse)
  pure serverResponse
