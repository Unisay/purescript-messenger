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

import Config (App, Config)
import Control.Monad.Reader.Class (class MonadAsk, ask)
import Control.Monad.Trans.Class (lift)
import Data.Enum (enumFromTo)
import Data.Maybe (Maybe(..))
import Data.Notification (Importance(..), critical, important, useful)
import Data.String as String
import Data.Traversable (traverse_)
import Effect.Class (class MonadEffect)
import Halogen (Component, liftEffect)
import Halogen as H
import Halogen.HTML.Events as HE
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended (InputType(..))
import Halogen.HTML.Properties.Extended as HP
import Halogen.Subscription as HS

data Action
  = Ticked Importance
  | SendNotification

type State = { selectedImportance ∷ Maybe Importance }

type Input = Unit

component ∷ ∀ q o. Component q Input o App
component = H.mkComponent
  { initialState
  , render
  , eval: H.mkEval $ H.defaultEval { handleAction = handleAction }
  }

initialState ∷ Input → State
initialState _ = { selectedImportance: Nothing }

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
          , HP.classNames [ "w-fit", "mt-0", "flex", "flex-col" ]
          ]
          ( enumFromTo bottom top <#> \importance → do
              let id_ = String.toLower $ show importance
              HH.section_
                [ HH.input
                    [ HP.name "specify-notification"
                    , HP.id id_
                    , HP.type_ InputRadio
                    , HE.onInput \_ → Ticked importance
                    , HP.classNames [ "scale-125" ]
                    ]
                , HH.label [ HP.for id_, HP.classNames [ "ml-2" ] ]
                    [ HH.text $ show importance ]
                ]
          )
      ]
  ]
  where
  buttonColor = case state.selectedImportance of
    Nothing → []
    Just Useful → [ "border-green-600", "bg-green-200" ]
    Just Important → [ "border-orange-600", "bg-orange-200" ]
    Just Critical → [ "border-red-600", "bg-red-200" ]

handleAction
  ∷ ∀ i o m
  . MonadAsk Config m
  ⇒ MonadEffect m
  ⇒ Action
  → H.HalogenM State Action i o m Unit
handleAction = case _ of
  Ticked importance →
    H.modify_ _ { selectedImportance = Just importance }
  SendNotification →
    H.gets _.selectedImportance >>= traverse_ \importance → do
      notify ← lift ask <#> \config →
        liftEffect <<< HS.notify config.notifications.listener
      case importance of
        Useful → notify $ useful "Useful"
        Important → notify $ important "Important"
        Critical → notify $ critical "Critical"
