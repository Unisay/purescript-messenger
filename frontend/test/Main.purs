module Test.Main where

import Prelude

import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Data.Route (Route(..), route)
import Effect (Effect)
import Routing.Duplex as Routing
import Test.Unit (TestSuite, describe, test)
import Test.Unit.Assert (shouldEqual)
import Test.Unit.Main (runTest)

main :: Effect Unit
main = runTest do
  describe "Routing: parser" routeParsing
  describe "Routing: printer" routePrinting

routeParsing :: TestSuite
routeParsing = do
  let checkRoute s r = Routing.parse route s `shouldEqual` Right r
  test "Home" do checkRoute "/" (Just Home)
  test "SignIn" do checkRoute "/signin" (Just SignIn)
  test "SignUp" do checkRoute "/signup" (Just SignUp)
  test "Unknown route" do checkRoute "/xxx" Nothing

routePrinting :: TestSuite
routePrinting = do
  let printRoute r s = Routing.print route (Just r) `shouldEqual` s
  test "Home" do printRoute Home "/"
  test "SignIn" do printRoute SignIn "/signin"
  test "SignUp" do printRoute SignUp "/signup"
