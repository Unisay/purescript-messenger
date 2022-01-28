module Test.Main where

import Prelude

import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Data.Route (Route(..), codec)
import Data.Username as Username
import Effect (Effect)
import Effect.Class (liftEffect)
import Effect.Class.Console (log)
import Routing.Duplex as Routing
import Test.QuickCheck
  ( class Testable
  , Result(..)
  , Seed
  , quickCheckWithSeed
  , randomSeed
  , (===)
  )
import Test.Unit (TestSuite, describe, test)
import Test.Unit.Assert (shouldEqual)
import Test.Unit.Main (runTest)

main ∷ Effect Unit
main = withSeed >>= \seed → runTest do
  describe "Route printer" do
    let printRoute r s = Routing.print codec r `shouldEqual` s
    test "Home" do
      printRoute Home "/"
    test "SignIn" do
      printRoute SignIn "/signin"
    test "SignUp" do
      printRoute SignUp "/signup"
    test "Profile" do
      printRoute (Profile (Username.unsafe "yura")) "/profile/yura"

  describe "Route properties" do

    property "All routes roundrip" seed \route →
      case Routing.parse codec (Routing.print codec route) of
        Right (Just route') → route === route'
        Right Nothing → Failed $ "Unknown route: " <> show route
        Left err → Failed (show err)

    property "All routes are not empty strings" seed $
      propAllRoutesPrintNonEmptyString

    property "All routes printed start from /" seed $
      propAllRoutesStartFromSlash

    property "Different routes always print into different strings" seed $
      propDifferentRoutesPrintDifferentStrings

    property "Different strings always parse into different routes" seed $
      propDifferentStringsParseIntoDifferentRoutes

propAllRoutesPrintNonEmptyString ∷ Route → Result
propAllRoutesPrintNonEmptyString _route = Failed "Not implemented"

propAllRoutesStartFromSlash ∷ Route → Result
propAllRoutesStartFromSlash _route = Failed "Homework"

propDifferentRoutesPrintDifferentStrings ∷ Route → Route → Result
propDifferentRoutesPrintDifferentStrings _r1 _r2 = Failed "Homework"

propDifferentStringsParseIntoDifferentRoutes ∷ String → String → Result
propDifferentStringsParseIntoDifferentRoutes _s1 _s2 = Failed "Homework"

-- Helper functions:

withSeed ∷ Effect Seed
withSeed = do
  seed ← randomSeed
  log $ "Using " <> show seed
  pure seed

property ∷ ∀ prop. Testable prop ⇒ String → Seed → prop → TestSuite
property name seed = test name <<< liftEffect <<< quickCheckWithSeed seed 100
