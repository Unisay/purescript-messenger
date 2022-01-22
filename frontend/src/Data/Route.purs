module Data.Route where

import Prelude

import Data.Username (Username, parse, toString)
import Data.Array.NonEmpty (fold1)
import Data.Bifunctor (lmap)
import Data.Either (Either)
import Data.Generic.Rep (class Generic)
import Data.Maybe (Maybe)
import Data.Show.Generic (genericShow)
import Routing.Duplex (RouteDuplex', as, optional, path, root, segment)
import Routing.Duplex.Generic as G

-- https://github.com/natefaubion/purescript-routing-duplex/blob/v0.2.0/README.md

data Route
  = Home -- /
  | SignIn -- /signin 
  | SignUp -- /signup
  | Profile Username -- /profile/:username

derive instance Generic Route _
derive instance Eq Route
instance Show Route where
  show = genericShow

route :: RouteDuplex' (Maybe Route)
route = optional $ root $ G.sum
  { "Home": G.noArgs
  , "SignIn": path "signin" G.noArgs
  , "SignUp": path "signup" G.noArgs
  , "Profile": path "profile" (username segment)
  }

usernameToString :: Username -> String
usernameToString = toString

stringToUsername :: String -> Either String Username
stringToUsername str = lmap fold1 $ parse str

username :: RouteDuplex' String -> RouteDuplex' Username
username = as usernameToString stringToUsername