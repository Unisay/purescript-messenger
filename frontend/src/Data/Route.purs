module Data.Route where

import Prelude

import Data.Array.NonEmpty (intercalate)
import Data.Bifunctor (lmap)
import Data.Generic.Rep (class Generic)
import Data.Maybe (Maybe)
import Data.Show.Generic (genericShow)
import Data.Username (Username)
import Data.Username as Username
import Routing.Duplex (RouteDuplex(..), as, path, root, segment)
import Routing.Duplex.Generic as G
import Routing.Duplex.Parser as Parser

-- https://github.com/natefaubion/purescript-routing-duplex/blob/v0.2.0/README.md

data Route
  = Home -- /
  | SignIn -- /signin 
  | SignUp -- /signup
  | Profile Username -- /profile/:username

derive instance Generic Route _
derive instance Eq Route
derive instance Ord Route
instance Show Route where
  show = genericShow

codec :: RouteDuplex Route (Maybe Route)
codec = RouteDuplex i (Parser.optional o)
  where
  username = as Username.toString (Username.parse >>> lmap (intercalate ";"))
  RouteDuplex i o = root $ G.sum
    { "Home": G.noArgs
    , "SignIn": path "signin" G.noArgs
    , "SignUp": path "signup" G.noArgs
    , "Profile": path "profile" (username segment)
    }
