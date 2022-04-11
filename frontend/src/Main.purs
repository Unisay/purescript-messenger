module Main where

import Prelude

import AppM as App
import Component.Router as Router
import Data.Maybe (Maybe(..))
import Data.Route as Route
import Effect (Effect)
import Effect.Aff (launchAff_)
import Effect.Class (liftEffect)
import Halogen as H
import Halogen.Aff (awaitBody, runHalogenAff)
import Halogen.Subscription as Subscription
import Halogen.VDom.Driver (runUI)
import Routing.Duplex as RD
import Routing.Hash (matchesWith)

main ∷ Effect Unit
main = runHalogenAff do
  body ← awaitBody
  notifications ← liftEffect Subscription.create
  let config = { notifications, backendApiUrl: "http://localhost:8081" }
  let ui = H.hoist (App.run config) Router.component
  router ← runUI ui unit body
  void $ liftEffect $ matchesWith (RD.parse Route.codec) \old new →
    when (old /= Just new) do
      launchAff_ $ router.query $ H.mkTell $ Router.Navigate new

