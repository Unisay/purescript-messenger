module Component.Signin where

import Prelude
import Data.Maybe (Maybe(..), fromMaybe)
import Data.String (null)
import Effect (Effect)
import Effect.Aff.Class (class MonadAff)
import Effect.Class.Console (log)
import Halogen (liftEffect)
import Halogen as H
import Halogen.Aff (awaitBody, runHalogenAff)
import Tailwind as TW
import Halogen.HTML.Events as HE
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties as HP
import Halogen.VDom.Driver (runUI)
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

component :: forall query input output m. MonadAff m => H.Component query input output m
component =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval $ H.defaultEval { handleAction = handleAction }
    }

initialState :: forall input. input -> State
initialState _ =
  { loading: false
  , login: Nothing
  , password: Nothing
  , result: Nothing
  }

render :: forall m. State -> H.ComponentHTML Action () m
render state =
  HH.form
    [ HP.id "form-login"
    , HE.onSubmit SubmitForm
    , HP.classes [ TW.flex, TW.flexCol, TW.itemsCenter ]
    ]
    [ HH.h1_ [ HH.text "Please enter your login and password" ]
    , HH.label [ HP.for "input-login" ] [ HH.text "Enter login:" ]
    , HH.input
        [ HP.id "input-login"
        , HP.value $ fromMaybe "" state.login
        , HE.onValueInput SetLogin
        ]
    , HH.label [ HP.for "input-password" ]
        [ HH.text "Enter password:" ]
    , HH.input
        [ HP.id "input-password"
        , HP.value $ fromMaybe "" state.password
        , HE.onValueInput SetPassword
        ]
    , HH.button
        [ HP.disabled state.loading
        , HP.type_ HP.ButtonSubmit
        , HP.classes $ HH.ClassName
            <$> [ "border-solid", "bg-yellow-500", "text-white", "p-3" ]
        ]
        [ HH.text "Login" ]
    , HH.whenElem state.loading \_ ->
        HH.p_
          [ HH.text "Please wait" ]
    ]

handleAction ::
  forall output m.
  MonadAff m =>
  Action -> H.HalogenM State Action () output m Unit
handleAction = case _ of
  SetLogin str -> do
    log $ "Login " <> show str <> " was set"
    H.modify_ _ { login = if null str then Nothing else Just str }
  SetPassword str -> do
    log $ "Password " <> show str <> " was set"
    H.modify_ _ { password = if null str then Nothing else Just str }
  SubmitForm ev -> do
    liftEffect $ Event.preventDefault ev
    { login, password } <- H.get
    log "form was submitted"
    log $ show login
    log $ show password
