module Component.Signin where

import Prelude

import Affjax (defaultRequest, printError, request) as AX
import Affjax.RequestBody (RequestBody(..)) as AX
import Data.Argonaut.Encode (encodeJson) as Json
import Data.Array as Array
import Data.Either (Either(..))
import Data.HTTP.Method (Method(..))
import Data.Maybe (Maybe(..), maybe)
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
import Halogen.HTML.Properties as HP
import Halogen.VDom.Driver (runUI)
import Tailwind as TW
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
  , usernameValidationError :: Maybe String
  , passwordValue :: String
  , passwordValidationError :: Maybe String
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
  , usernameValidationError: Nothing
  , passwordValue: ""
  , passwordValidationError: Nothing
  , result: Nothing
  }

render :: forall m. State -> H.ComponentHTML Action () m
render state = signinFormContainer
  where
  signinFormContainer =
    HH.div
      [ HP.classes
          [ TW.minHScreen
          , TW.flex
          , TW.itemsCenter
          , TW.justifyCenter
          , TW.bgGray50
          , TW.py12
          , TW.px4
          , TW.smPx6
          , TW.lgPx8
          ]
      ]
      [ HH.div
          [ HP.classes [ TW.maxWMd, TW.wFull, TW.spaceY8 ] ]
          [ signinFormHeader, signinForm ]
      ]

  signinFormHeader =
    HH.div_
      [ HH.img
          [ HP.src "images/chat.svg"
          , HP.alt "Chat Logo"
          , HP.classes [ TW.mxAuto, TW.h28 ]
          ]
      , HH.h2
          [ HP.classes
              [ TW.mt6
              , TW.textCenter
              , TW.text3Xl
              , TW.fontExtrabold
              , TW.textGray900
              ]
          ]
          [ HH.text "Sign in to your account" ]
      ]

  signinForm =
    HH.form
      [ HP.id "form-username"
      , HE.onSubmit SubmitForm
      , HP.classes [ TW.mt8, TW.spaceY6 ]
      ]
      [ HH.div [ HP.classes [ TW.roundedMd, TW.shadowSm, TW.spaceYPx ] ]
          [ HH.div_ $ Array.concat
              [ [ HH.label [ HP.for "input-username" ] [ HH.text "Username" ] ]
              , ( maybe [] pure state.usernameValidationError <#> \errorMessage ->
                    HH.div [ HP.classes [ TW.textRed800 ] ] [ HH.text errorMessage ]
                )
              , [ HH.input
                    [ HP.id "input-username"
                    , HP.required true
                    , HP.autocomplete true
                    , HP.placeholder "Username"
                    , HP.value state.usernameValue
                    , HE.onValueInput SetUsername
                    , HP.classes
                        [ TW.appearanceNone
                        , TW.roundedNone
                        , TW.relative
                        , TW.block
                        , TW.wFull
                        , TW.px3
                        , TW.py2
                        , TW.border
                        , TW.borderGray300
                        , TW.placeholderGray500
                        , TW.textGray900
                        , TW.focusOutlineNone
                        , TW.focusRingIndigo500
                        , TW.focusBorderIndigo500
                        , TW.focusZ10
                        , TW.smTextSm
                        ]
                    ]
                ]
              ]
          , HH.div_
              [ HH.label [ HP.for "input-password" ]
                  [ HH.text "Password " ]
              , HH.input
                  [ HP.id "input-password"
                  , HP.placeholder "Password"
                  , HP.required true
                  , HP.autocomplete true
                  , HP.type_ HP.InputPassword
                  , HP.value state.passwordValue
                  , HE.onValueInput SetPassword
                  , HP.classes
                      [ TW.appearanceNone
                      , TW.roundedNone
                      , TW.relative
                      , TW.block
                      , TW.wFull
                      , TW.px3
                      , TW.py2
                      , TW.border
                      , TW.borderGray300
                      , TW.placeholderGray500
                      , TW.textGray900
                      , TW.focusOutlineNone
                      , TW.focusRingIndigo500
                      , TW.focusBorderIndigo500
                      , TW.focusZ10
                      , TW.smTextSm
                      ]
                  ]
              ]
          , HH.div_
              [ HH.button
                  [ HP.disabled state.loading
                  , HP.type_ HP.ButtonSubmit
                  , HP.classes
                      [ TW.group
                      , TW.wFull
                      , TW.flex
                      , TW.justifyCenter
                      , TW.py2
                      , TW.px4
                      , TW.border
                      , TW.borderTransparent
                      , TW.textSm
                      , TW.fontMedium
                      , TW.roundedMd
                      , TW.textWhite
                      , if state.loading then TW.bgGray500 else TW.bgIndigo600
                      , if state.loading then TW.hoverBgGray600 else TW.hoverBgIndigo700
                      , TW.focusOutlineNone
                      , TW.focusRing2
                      , TW.focusRingOffset2
                      , TW.focusRingIndigo500
                      ]
                  ]
                  [ HH.span
                      [ HP.classes
                          [ TW.left0
                          , TW.flex
                          , TW.itemsCenter
                          , TW.pl3
                          ]
                      ]
                      [ HH.text
                          if state.loading then "Signing in..." else "Sign In"
                      ]
                  ]
              ]
          ]

      ]

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
        H.modify_ _ { usernameValidationError = Just "Invalid Username" }
      Just username -> do
        H.modify_ _ { usernameValidationError = Nothing }
        case Password.parse passwordValue of
          Nothing ->
            H.modify_ _ { passwordValidationError = Just "Invalid Password" }
          Just password -> do
            H.modify_ _ { passwordValidationError = Nothing, loading = true }
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
