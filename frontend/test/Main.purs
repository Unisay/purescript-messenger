module Test.Main where

import Prelude

import Data.Array (all, length)
import Data.CodePoint.Unicode (isPrint)
import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Data.Route (Route(..), codec)
import Data.String (toCodePointArray)
import Data.String as String
import Data.Username as Username
import Effect (Effect)
import Effect.Class (liftEffect)
import Effect.Class.Console (log)
import Routing.Duplex as Routing
import Test.QuickCheck (class Testable, Result(..), Seed, quickCheckWithSeed, randomSeed, (===))
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
      propAllRoutesPrintNonBlankString

    property "All routes printed start from /" seed $
      propAllRoutesStartFromSlash

    property "Route equality under printing" seed $
      propRouteEqualityUnderPrinting

    property "Route equality under parsing" seed $
      propEqualityUnderParsing

propAllRoutesPrintNonBlankString ∷ Route → Result
propAllRoutesPrintNonBlankString route =
  if all isPrint cs && length cs > 0 then Success
  else Failed "Route is empty"
  where
  cs = toCodePointArray $ Routing.print codec route

propAllRoutesStartFromSlash ∷ Route → Result
propAllRoutesStartFromSlash route =
  case String.uncons (Routing.print codec route) of
    Just { head } | head == String.codePointFromChar '/' -> Success
    _ -> Failed "Printed route doesn't start with slash"

propRouteEqualityUnderPrinting ∷ Route -> Route → Result
propRouteEqualityUnderPrinting route1 route2 =
  routeEquality === printedEquality
  where
  printedEquality = printRoute route1 == printRoute route2
  routeEquality = route1 == route2
  printRoute = Routing.print codec

propEqualityUnderParsing ∷ String -> String → Result
propEqualityUnderParsing str1 str2 =
  if stringEquality == resultEquality then Success
  else Failed $ String.joinWith "\n"
    [ "String equality: " <> show stringEquality
    , "Result equality: " <> show resultEquality
    , "String #1: " <> str1
    , "String #2: " <> str2
    , "Result #1: " <> show (parseRoute str1)
    , "Result #2: " <> show (parseRoute str2)
    ]
  where
  parseRoute = Routing.parse codec
  resultEquality = case parseRoute str1, parseRoute str2 of
    Right route1, Right route2 -> route1 == route2
    _, _ -> stringEquality
  stringEquality = str1 == str2

-- Helper functions:

withSeed ∷ Effect Seed
withSeed = do
  seed <- randomSeed
  log ("Using " <> show seed)
  pure seed

property ∷ ∀ prop. Testable prop ⇒ String → Seed → prop → TestSuite
property name seed = test name <<< liftEffect <<< quickCheckWithSeed seed 1000
