module Component.Error where

import Preamble

import Affjax.StatusCode (StatusCode(..))
import AppM as App
import Backend (Error(..))
import Halogen as H
import Halogen.HTML.Events as HE
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP

data Output = Retry | SignIn

instance Show Output where
  show = case _ of
    Retry → "Retry"
    SignIn → "SignIn"

data Action = Notify Output

type Input = App.Error

type State = App.Error

component ∷ ∀ m q. H.Component q Input Output m
component = H.mkComponent
  { initialState: identity
  , render
  , eval: H.mkEval $ H.defaultEval { handleAction = handleAction }
  }

render ∷ ∀ m s. State → H.ComponentHTML Action s m
render error = HH.div
  [ HP.classNames
      [ "flex"
      , "items-center"
      , "justify-center"
      , "min-h-screen"
      , "bg-gray-100"
      ]
  ]
  [ HH.div
      [ HP.classNames
          [ "max-w-md"
          , "w-full"
          , "flex"
          , "flex-col"
          , "justify-center"
          , "items-center"
          , "space-y-3"
          , "rounded"
          , "border"
          , "border-slate-300"
          , "p-5"
          , "shadow-xl"
          , "bg-white"
          ]
      ]
      [ HH.span [ HP.classNames [ "text-8xl", "font-semibold" ] ]
          [ HH.text "Ouch," ]
      , HH.span [ HP.classNames [ "font-medium", "text-center" ] ]
          [ HH.text $ renderError error ]
      , errorAction error # \{ action, caption } →
          HH.button
            [ HP.classNames
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
                , "bg-indigo-600"
                , "hover-bg-indigo-700"
                , "focus-outline-none"
                , "focus-ring-2"
                , "focus-ring-offset-2"
                , "focus-ring-indigo-500"
                ]
            , HE.onClick \_ → Notify action
            ]
            [ HH.text caption ]
      ]
  ]

handleAction ∷ ∀ m. Action → H.HalogenM State Action () Output m Unit
handleAction (Notify action) = H.raise action

errorAction ∷ App.Error → { action ∷ Output, caption ∷ String }
errorAction (App.BackendError err) =
  case err of
    ResponseStatusError { actual: StatusCode 403 } →
      { action: SignIn, caption: "Okay" }
    _ →
      { action: Retry, caption: "Retry" }

renderError ∷ App.Error → String
renderError (App.BackendError err) =
  case err of
    ResponseStatusError { actual: StatusCode 403 } →
      """
      Your session has expired! Please sign in to your account again.
      """
    _ →
      """
      We are really sorry, but application is unable to serve your
      request at this time because of an unexpected critical error.
      """