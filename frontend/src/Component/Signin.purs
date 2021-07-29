module Component.Signin where

import Prelude
import Affjax (defaultRequest, printError, request) as AX
import Affjax.RequestBody (RequestBody(..)) as AX
import Data.Either (Either(..))
import Data.Argonaut.Encode (encodeJson) as Json
import Data.HTTP.Method (Method(..))
import Data.Maybe (Maybe(..), fromMaybe)
import Data.String (null)
import Effect (Effect)
import Effect.Aff (Aff)
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
  = { loading :: Boolean
    , login :: Maybe String
    , password :: Maybe String
    , result :: Maybe String
    }

data Action
  = SetLogin String
  | SetPassword String
  | SubmitForm Event

component ::
  forall query input output m. MonadAff m => H.Component query input output m
component =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval $ H.defaultEval { handleAction = handleAction }
    }

initialState :: forall input. input -> State
initialState _input =
  { loading: false
  , login: Nothing
  , password: Nothing
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
      [ HP.id "form-login"
      , HE.onSubmit SubmitForm
      , HP.classes [ TW.mt8, TW.spaceY6 ]
      ]
      [ HH.div [ HP.classes [ TW.roundedMd, TW.shadowSm, TW.spaceYPx ] ]
          [ HH.div_
              [ HH.label [ HP.for "input-email", HP.class_ TW.srOnly ]
                  [ HH.text "Email address" ]
              , HH.input
                  [ HP.id "input-email"
                  , HP.type_ HP.InputEmail
                  , HP.required true
                  , HP.autocomplete true
                  , HP.placeholder "Email address"
                  , HP.value $ fromMaybe "" state.login
                  , HE.onValueInput SetLogin
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
                      , TW.roundedTMd
                      , TW.focusOutlineNone
                      , TW.focusRingIndigo500
                      , TW.focusBorderIndigo500
                      , TW.focusZ10
                      , TW.smTextSm
                      ]
                  ]
              ]
          , HH.div_
              [ HH.label [ HP.for "input-password", HP.class_ TW.srOnly ]
                  [ HH.text "Password " ]
              , HH.input
                  [ HP.id "input-password"
                  , HP.placeholder "Password"
                  , HP.required true
                  , HP.autocomplete true
                  , HP.type_ HP.InputPassword
                  , HP.value $ fromMaybe "" state.password
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
                      , TW.roundedBMd
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
                      , TW.relative
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
                      , TW.bgIndigo600
                      , TW.hoverBgIndigo700
                      , TW.focusOutlineNone
                      , TW.focusRing2
                      , TW.focusRingOffset2
                      , TW.focusRingIndigo500
                      ]
                  ]
                  [ HH.span
                      [ HP.classes
                          [ TW.absolute
                          , TW.left0
                          , TW.insetY0
                          , TW.flex
                          , TW.itemsCenter
                          , TW.pl3
                          ]
                      ]
                      [ HH.text "Sign In" ]
                  ]
              ]
          ]
      , HH.whenElem state.loading \_ ->
          HH.p_ [ HH.text "Please wait" ]
      ]

handleAction ::
  forall output m.
  MonadAff m =>
  Action -> H.HalogenM State Action () output m Unit
handleAction = case _ of
  SetLogin str -> do
    log $ "Login " <> show str <> " was set"
    H.modify_ \x -> x { login = if null str then Nothing else Just str }
  SetPassword str -> do
    log $ "Password " <> show str <> " was set"
    H.modify_ _ { password = if null str then Nothing else Just str }
  SubmitForm ev -> do
    liftEffect $ Event.preventDefault ev
    { login, password } <- H.get
    signInResponse <- liftAff $ sendRequestToServer login password
    case signInResponse of
      Ok -> log "Successfully signed in"
      Failure -> log "Sign in failed"

data SignInResponse
  = Ok
  | Failure

instance showSignInResponse :: Show SignInResponse where
  show = case _ of
    Ok -> "Ok"
    Failure -> "Failure"

sendRequestToServer :: Maybe String -> Maybe String -> Aff SignInResponse
sendRequestToServer username password = do
  log "Form is being submitted...."
  response <-
    AX.request
      AX.defaultRequest
        { method = Left POST
        , url = "http://localhost:8081/login"
        , content =
          Just $ AX.Json
            $ Json.encodeJson { username, password }
        }
  serverResponse :: SignInResponse <- case response of
    Left err -> log (AX.printError err) $> Failure
    Right res -> log (show res) $> Ok
  log ("Received server response: " <> show serverResponse)
  pure serverResponse
