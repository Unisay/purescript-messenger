module Config where

import Auth0 as Auth0
import Data.Notification (Notification)
import Halogen.Subscription (SubscribeIO)
import Web.Storage.Storage (Storage)

type Config =
  { notifications ∷ SubscribeIO Notification
  , backendApiUrl ∷ String
  , storage ∷ Storage
  , auth0Config ∷ Auth0.Config
  }

