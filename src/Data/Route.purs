module Data.Route where

import Preamble

import Data.Array.NonEmpty as NEA
import Data.Generic.Rep (class Generic)
import Data.Show.Generic (genericShow)
import Halogen.HTML (IProp)
import Halogen.HTML.Properties as HP
import Routing.Duplex (RouteDuplex', path, print, root)
import Routing.Duplex.Generic as G
import Routing.Hash (setHash)
import Test.QuickCheck.Arbitrary (class Arbitrary)
import Test.QuickCheck.Gen as Gen

-- https://github.com/natefaubion/purescript-routing-duplex/blob/v0.2.0/README.md

data Route
  = Home -- /
  | Debug -- /debug 
  | Chat -- /chat

derive instance Generic Route _
derive instance Eq Route
derive instance Ord Route
instance Show Route where
  show = genericShow

instance Arbitrary Route where
  arbitrary =
    Gen.oneOf $ NEA.cons' (pure Home)
      [ pure Debug
      , pure Chat
      ]

codec ∷ RouteDuplex' Route
codec = root $ G.sum
  { "Home": G.noArgs
  , "Debug": path "debug" G.noArgs
  , "Chat": path "chat" G.noArgs
  }

goTo ∷ ∀ m. MonadEffect m ⇒ Route → m Unit
goTo = liftEffect <<< setHash <<< print codec

href ∷ ∀ r i. Route → IProp (href ∷ String | r) i
href = print codec >>> append "#" >>> HP.href

publicRoutes ∷ Array Route
publicRoutes = [ Home, Debug ]
