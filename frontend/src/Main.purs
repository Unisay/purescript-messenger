module Main where

import Prelude

import Component.Router as Router
import Data.Maybe (Maybe(..))
import Data.Route as Route
import Effect (Effect)
import Effect.Aff (launchAff_)
import Effect.Class (liftEffect)
import Halogen as H
import Halogen.Aff (awaitBody, runHalogenAff)
import Halogen.VDom.Driver (runUI)
import Routing.Duplex as RD
import Routing.Hash (matchesWith)

main :: Effect Unit
main = runHalogenAff do
  body <- awaitBody
  router <- runUI Router.component unit body
  void $ liftEffect $ matchesWith (RD.parse Route.codec) \old new ->
    when (old /= Just new) do
      launchAff_ $ router.query $ H.mkTell $ Router.Navigate new
