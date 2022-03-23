module Component.Debug where

import Prelude

import Data.Notification (Notification(..), critical, important, useful)
import Effect.Aff.Class (class MonadAff)
import Halogen (Component, liftEffect)
import Halogen as H
import Halogen.HTML.Events as HE
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP
import Halogen.Subscription as HS

data Action
  = SendUseful
  | SendImportant
  | SendCritical

type State =
  { notifications ∷ HS.Listener Notification
  }

type Input = HS.Listener Notification

component ∷ ∀ q o m. MonadAff m ⇒ Component q Input o m
component = H.mkComponent
  { initialState
  , render
  , eval: H.mkEval $ H.defaultEval { handleAction = handleAction }
  }

initialState ∷ Input → State
initialState notifications = { notifications }

render ∷ ∀ m. State → H.ComponentHTML Action () m
render _st = HH.div
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
          , "space-y-8"
          , "rounded"
          , "border"
          , "border-slate-300"
          , "p-5"
          , "shadow-xl"
          , "bg-white"
          ]
      ]
      [ HH.button
          [ HP.type_ HP.ButtonButton
          , HE.onClick \_ → SendUseful
          , HP.classNames
              [ "justify-center"
              , "flex"
              , "font-medium"
              , "border-2"
              , "border-green-600"
              , "bg-green-200"
              , "w-full"
              , "mb-2"
              ]
          ]
          [ HH.span_
              [ HH.text "Useful" ]
          ]
      , HH.button
          [ HP.type_ HP.ButtonButton
          , HE.onClick \_ → SendImportant
          , HP.classNames
              [ "justify-center"
              , "flex"
              , "font-medium"
              , "border-2"
              , "border-orange-600"
              , "bg-orange-200"
              , "w-full"
              , "mb-2"
              ]
          ]
          [ HH.span_
              [ HH.text "Important" ]
          ]
      , HH.button
          [ HP.type_ HP.ButtonButton
          , HE.onClick \_ → SendCritical
          , HP.classNames
              [ "justify-center"
              , "flex"
              , "font-medium"
              , "border-2"
              , "border-red-600"
              , "bg-red-200"
              , "w-full"
              ]
          ]
          [ HH.span_
              [ HH.text "Critical" ]
          ]
      ]
  ]

handleAction
  ∷ ∀ i o m
  . MonadAff m
  ⇒ Action
  → H.HalogenM State Action i o m Unit
handleAction = case _ of
  SendUseful → sendNotification $ useful "Useful"
  SendImportant → sendNotification $ important "Important"
  SendCritical → sendNotification $ critical "Critical"
  where
  sendNotification n = do
    { notifications } ← (H.get ∷ H.HalogenM State Action _ _ _ State)
    liftEffect $ HS.notify notifications n

