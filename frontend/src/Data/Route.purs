module Data.Route where

import Prelude

import Data.Generic.Rep (class Generic)
import Data.Maybe (Maybe)
import Data.Show.Generic (genericShow)
import Routing.Duplex (RouteDuplex', optional, path, root)
import Routing.Duplex.Generic as G

-- import Data.Username (Username)

-- https://github.com/natefaubion/purescript-routing-duplex/blob/v0.2.0/README.md

data Route
  = Home -- /
  | SignIn -- /signin 
  | SignUp -- /signup

-- | Profile Username -- /profile/:username

derive instance Generic Route _
derive instance Eq Route
instance Show Route where
  show = genericShow

route :: RouteDuplex' (Maybe Route)
route = optional $ root $ G.sum
  { "Home": G.noArgs
  , "SignIn": path "signin" G.noArgs
  , "SignUp": path "signup" G.noArgs
  -- , "Profile": path "profile" (username segment)
  }
