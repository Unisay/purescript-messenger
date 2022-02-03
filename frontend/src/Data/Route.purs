module Data.Route where

import Prelude

import Data.Array.NonEmpty as NEA
import Data.Bifunctor (lmap)
import Data.Generic.Rep (class Generic)
import Data.Maybe (Maybe)
import Data.Show.Generic (genericShow)
import Data.Username (Username)
import Data.Username as Username
import Effect.Class (class MonadEffect, liftEffect)
import Routing.Duplex (RouteDuplex(..), RouteDuplex', as, path, print, root, segment)
import Routing.Duplex.Generic as G
import Routing.Duplex.Parser as Parser
import Routing.Hash (setHash)
import Test.QuickCheck.Arbitrary (class Arbitrary, arbitrary)
import Test.QuickCheck.Gen as Gen

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

instance Arbitrary Route where
  arbitrary = Gen.oneOf $ NEA.cons' (pure Home)
    [ pure SignIn
    , pure SignUp
    , Profile <$> arbitrary
    ]

codec :: RouteDuplex' Route
codec = RouteDuplex i o
  where
  username = as Username.toString (Username.parse >>> lmap (NEA.intercalate ";"))
  RouteDuplex i o = root $ G.sum
    { "Home": G.noArgs
    , "SignIn": path "signin" G.noArgs
    , "SignUp": path "signup" G.noArgs
    , "Profile": path "profile" (username segment)
    }

goTo :: forall m. MonadEffect m => Route -> m Unit
goTo = liftEffect <<< setHash <<< print codec
