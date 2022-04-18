module Config where

import Data.Notification (Notification)
import Halogen.Subscription (SubscribeIO)

type Config =
  { notifications ∷ SubscribeIO Notification
  , backendApiUrl ∷ String
  }

