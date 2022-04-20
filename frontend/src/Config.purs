module Config where

import Data.Auth.Token as Auth
import Data.Maybe (Maybe)
import Data.Notification (Notification)
import Effect.Ref (Ref)
import Halogen.Subscription (SubscribeIO)
import Web.Storage.Storage (Storage)

type Config =
  { notifications ∷ SubscribeIO Notification
  , backendApiUrl ∷ String
  , auth ∷ Ref (Maybe Auth.Token)
  , storage ∷ Storage
  }
