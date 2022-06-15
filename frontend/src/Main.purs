module Main where

import Preamble

import Auth0 as Auth
import Component.Router as Router
import Control.Monad.Reader (runReaderT)
import Data.Route as Route
import Effect.Aff (launchAff_)
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
  auth0Client ← Auth.newClient
  -- let redirectOpts = { redirect_url: "https://localhost:8000/ok" }
  -- runReaderT (Auth.loginWithRedirect redirectOpts) { auth0Client }
  let
    config =
      { notifications
      , backendApiUrl: "http://localhost:8081"
      , storage
      , auth0Client
      }
  router ← runUI Router.component config body
  void $ liftEffect $ matchesWith (RD.parse Route.codec) \old new →
    when (old /= Just new) do
      launchAff_
        $ map (fromMaybe unit)
        $ router.query
        $ H.mkTell
        $ Router.Navigate new

