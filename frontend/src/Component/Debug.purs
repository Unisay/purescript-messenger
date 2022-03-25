module Component.Debug
  ( Action(..)
  , Input
  , State
  , component
  , handleAction
  , initialState
  , render
  ) where

import Prelude

import Data.Maybe (Maybe(..))
import Data.Notification (Importance(..), Notification, critical, important, useful)
import Effect.Aff.Class (class MonadAff)
import Halogen (Component, liftEffect)
import Halogen as H
import Halogen.HTML.Events as HE
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended (InputType(..))
import Halogen.HTML.Properties.Extended as HP
import Halogen.Subscription as HS

data Action
  = UsefulTicked
  | ImportantTicked
  | CriticalTicked
  | SendNotification

type State =
  { notifications ∷ HS.Listener Notification
  , selectState ∷ Maybe Importance
  }

type Input = HS.Listener Notification

component ∷ ∀ q o m. MonadAff m ⇒ Component q Input o m
component = H.mkComponent
  { initialState
  , render
  , eval: H.mkEval $ H.defaultEval { handleAction = handleAction }
  }

initialState ∷ Input → State
initialState notifications =
  { notifications
  , selectState: Nothing
  }

render ∷ ∀ m. State → H.ComponentHTML Action () m
render state = HH.div
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
      [ HH.button
          [ HP.type_ HP.ButtonButton
          , HE.onClick \_ → SendNotification
          , HP.classNames $
              [ "font-medium"
              , "border-2"
              , "w-3/5"
              , "mb-2"
              , "h-12"
              ] <> buttonColor
          ]
          [ HH.span_
              [ HH.text "Send notification" ]
          ]
      , HH.p [ HP.classNames [ "text-xl" ] ]
          [ HH.text "Choose notification type below:" ]
      , HH.form
          [ HP.id "form-notification_type"
          , HP.classNames
              [ "w-fit"
              , "mt-0"
              , "flex"
              , "flex-col"
              ]
          ]
          [ HH.section_
              [ HH.input
                  [ HP.name "specify-notification"
                  , HP.type_ InputRadio
                  , HE.onInput \_ → UsefulTicked
                  , HP.classNames [ "scale-125" ]
                  ]
              , HH.span [ HP.classNames [ "ml-2" ] ]
                  [ HH.text "Useful" ]
              ]
          , HH.section_
              [ HH.input
                  [ HP.name "specify-notification"
                  , HP.type_ InputRadio
                  , HE.onInput \_ → ImportantTicked
                  , HP.classNames [ "scale-125" ]
                  ]
              , HH.span [ HP.classNames [ "ml-2" ] ]
                  [ HH.text "Important" ]
              ]
          , HH.section_
              [ HH.input
                  [ HP.name "specify-notification"
                  , HP.type_ InputRadio
                  , HE.onInput \_ → CriticalTicked
                  , HP.classNames [ "scale-125" ]
                  ]
              , HH.span [ HP.classNames [ "ml-2" ] ]
                  [ HH.text "Critical" ]
              ]
          ]
      ]
  ]
  where
  buttonColor = case state.selectState of
    Nothing → []
    Just Useful → [ "border-green-600", "bg-green-200" ]
    Just Important → [ "border-orange-600", "bg-orange-200" ]
    Just Critical → [ "border-red-600", "bg-red-200" ]

handleAction
  ∷ ∀ i o m
  . MonadAff m
  ⇒ Action
  → H.HalogenM State Action i o m Unit
handleAction = case _ of
  UsefulTicked → H.modify_ _ { selectState = Just Useful }
  ImportantTicked → H.modify_ _ { selectState = Just Important }
  CriticalTicked → H.modify_ _ { selectState = Just Critical }
  SendNotification → do
    { selectState, notifications } ← H.get
    case selectState of
      Nothing → pure unit
      Just Useful →
        send notifications $ useful "Useful"
      Just Important →
        send notifications $ important "Important"
      Just Critical →
        send notifications $ critical "Critical"
  where
  send f = liftEffect <<< HS.notify f