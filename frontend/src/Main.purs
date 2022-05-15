module Main where

import Preamble

import Component.Router as Router
import Data.Route as Route
import Effect.Aff (launchAff_)
import Effect.Class (liftEffect)
import Halogen as H
import Halogen.Aff (awaitBody, runHalogenAff)
import Halogen.Subscription as Subscription
import Halogen.VDom.Driver (runUI)
import Routing.Duplex as RD
import Routing.Hash (matchesWith)
import Web.HTML (window)
import Web.HTML.Window (localStorage)

main ∷ Effect Unit
main = runHalogenAff do
  body ← awaitBody
  storage ← liftEffect $ window >>= localStorage
  notifications ← liftEffect Subscription.create
  let
    config =
      { notifications
      , backendApiUrl: "http://localhost:8081"
      , storage
      }
  router ← runUI Router.component config body
  void $ liftEffect $ matchesWith (RD.parse Route.codec) \old new →
    when (old /= Just new) do
      launchAff_
        $ map (fromMaybe unit)
        $ router.query
        $ H.mkTell
        $ Router.Navigate new

