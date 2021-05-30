module Main where

import Prelude
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Halogen.Aff (awaitBody, runHalogenAff)
import Halogen.HTML as HH
import Halogen.VDom.Driver (runUI)
import Component.Signin as Signin

data Action
  = Increment
  | Decrement

main :: Effect Unit
main =
  runHalogenAff do
    body <- awaitBody
    runUI Signin.component unit body
