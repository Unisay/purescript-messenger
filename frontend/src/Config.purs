module Config where

import AppM (AppM)
import Data.Notification (Notification)
import Halogen.Subscription (SubscribeIO)

type Config =
  { notifications ∷ SubscribeIO Notification
  , backendApiUrl ∷ String
  }

type App = AppM Config

