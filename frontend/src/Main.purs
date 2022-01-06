module Main where

import Prelude
import Effect (Effect)
import Halogen.Aff (awaitBody, runHalogenAff)
import Halogen.VDom.Driver (runUI)
import Component.Signin as Signin

main :: Effect Unit
main =
  runHalogenAff do
    body <- awaitBody
    runUI Signin.component unit body
