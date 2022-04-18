module Main where

import Prelude

import Component.Router as Router
import Data.Maybe (Maybe(..))
import Data.Route as Route
import Effect (Effect)
import Effect.Aff (launchAff_)
import Effect.Class (liftEffect)
import Effect.Ref as Ref
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
  auth ← liftEffect $ Ref.new Nothing
  let
    config =
      { notifications
      , backendApiUrl: "http://localhost:8081"
      , auth
      }
  router ← runUI Router.component config body
  void $ liftEffect $ matchesWith (RD.parse Route.codec) \old new →
    when (old /= Just new) do
      launchAff_ $ router.query $ H.mkTell $ Router.Navigate new

