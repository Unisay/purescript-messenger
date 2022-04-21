module Config where

import Data.Notification (Notification)
import Halogen.Subscription (SubscribeIO)
import Web.Storage.Storage (Storage)

type Config =
  { notifications ∷ SubscribeIO Notification
  , backendApiUrl ∷ String
  , storage ∷ Storage
  }
