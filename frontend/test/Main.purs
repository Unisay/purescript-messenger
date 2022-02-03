module Test.Main where

import Prelude

import Data.Array (head)
import Data.CodePoint.Unicode (isPrint)
import Data.Either (Either(..))
import Data.Foldable (any)
import Data.Maybe (Maybe(..))
import Data.Route (Route(..), codec)
import Data.String (toCodePointArray)
import Data.String.CodeUnits (singleton, toCharArray)
import Data.Username as Username
import Effect (Effect)
import Effect.Class (liftEffect)
import Effect.Class.Console (log)
import Routing.Duplex as Routing
import Test.QuickCheck (class Testable, Result(..), Seed, quickCheckWithSeed, randomSeed, (/==), (===))
import Test.QuickCheck.Arbitrary (class Arbitrary, arbitrary)
import Test.QuickCheck.Gen (suchThat)
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
        Right route' → route === route'
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
propAllRoutesPrintNonEmptyString route =
  if
    any isPrint
      $ toCodePointArray
      $ Routing.print codec route then Success
  else Failed "Route is empty"

propAllRoutesStartFromSlash ∷ Route → Result
propAllRoutesStartFromSlash route =
  case head $ toCharArray $ Routing.print codec route of
    Nothing -> Failed "Route is empty"
    Just char ->
      if char == '/' then Success
      else Failed
        $ "Expected '/', but got: " <> singleton char

propDifferentRoutesPrintDifferentStrings ∷ Different Route → Result
propDifferentRoutesPrintDifferentStrings (Different r1 r2) =
  Routing.print codec r1 /== Routing.print codec r2

propDifferentStringsParseIntoDifferentRoutes ∷ Different String → Result
propDifferentStringsParseIntoDifferentRoutes (Different _s1 _s2) =
  Failed
    """As strings dont belong to parse cases of Route, 
   it always prints the same result - unknown route """

-- Helper functions:

withSeed ∷ Effect Seed
withSeed = do
  seed ← randomSeed
  log $ "Using " <> show seed
  pure seed

property ∷ ∀ prop. Testable prop ⇒ String → Seed → prop → TestSuite
property name seed = test name <<< liftEffect <<< quickCheckWithSeed seed 100

data Different a = Different a a

instance Show a => Show (Different a) where
  show (Different a1 a2) = "Different " <> show a1 <> " " <> show a2

instance (Eq a, Arbitrary a) => Arbitrary (Different a) where
  arbitrary = do
    a1 <- arbitrary
    a2 <- suchThat arbitrary \a -> a /= a1
    pure $ Different a1 a2
