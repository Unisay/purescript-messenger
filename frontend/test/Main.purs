module Test.Main where

import Prelude

import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Data.Route (Route(..), codec)
import Data.Traversable (traverse_)
import Data.Username as Username
import Effect (Effect)
import Routing.Duplex as Routing
import Test.Unit (TestSuite, describe, test)
import Test.Unit.Assert (shouldEqual)
import Test.Unit.Main (runTest)

main :: Effect Unit
main = runTest do
  describe "Route parser" routeParsing
  describe "Route printer" routePrinting
  describe "Route roundtrip" routeRoundtrip

routeParsing :: TestSuite
routeParsing = do
  let checkRoute s r = Routing.parse codec s `shouldEqual` Right r
  test "Home" do
    checkRoute "/" (Just Home)
  test "SignIn" do
    checkRoute "/signin" (Just SignIn)
  test "SignUp" do
    checkRoute "/signup" (Just SignUp)
  test "Profile" do
    checkRoute "/profile/yura" (Just fixture.profile)
  test "Unknown" do
    checkRoute "/unknown" Nothing

routePrinting :: TestSuite
routePrinting = do
  let printRoute r s = Routing.print codec r `shouldEqual` s
  test "Home" do
    printRoute Home "/"
  test "SignIn" do
    printRoute SignIn "/signin"
  test "SignUp" do
    printRoute SignUp "/signup"
  test "Profile" do
    printRoute fixture.profile "/profile/yura"

routeRoundtrip :: TestSuite
routeRoundtrip = test "All routes" $
  fixture.allRoutes # traverse_ \r ->
    Routing.parse codec (Routing.print codec r) `shouldEqual` Right (Just r)

fixture :: { profile :: Route, allRoutes :: Array Route }
fixture = { profile, allRoutes: [ Home, SignIn, SignUp, profile ] }
  where
  profile = Profile (Username.unsafe "yura")
