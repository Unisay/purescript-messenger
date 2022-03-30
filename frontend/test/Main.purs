module Test.Main where

import Prelude

import BackendSpec as Backend
-- import Data.RouteSpec as Route
import Effect (Effect)
import Effect.Aff (launchAff_)
import Test.Spec.Reporter (consoleReporter)
import Test.Spec.Runner (runSpec)

main ∷ Effect Unit
main = launchAff_ do
  -- Route.spec
  runSpec [ consoleReporter ] do
    Backend.spec
