module Main where

import Preamble

import Auth0 as Auth
import Component.Router as Router
import Control.Monad.Reader (runReaderT)
import Data.Route as Route
import Data.String.Utils as Str
import Effect.Aff (launchAff_)
import Halogen as H
import Halogen.Aff (awaitBody, runHalogenAff)
import Halogen.Subscription as Subscription
import Halogen.VDom.Driver (runUI)
import Routing.Duplex as RD
import Routing.Hash (matchesWith)
import Web.HTML (window)
import Web.HTML.Location (search)
import Web.HTML.Window (localStorage, location)

main ∷ Effect Unit
main = runHalogenAff do
  body ← awaitBody
  storage ← liftEffect $ window >>= localStorage
  notifications ← liftEffect Subscription.create
  auth0Client ← Auth.newClient
  qry ← liftEffect $ window >>= location >>= search
  { auth0Client } # runReaderT do
    when (Str.includes "code=" qry && Str.includes "state=" qry) do
      void $ Auth.handleRedirectCallback
    unlessM Auth.isAuthenticated do
      Auth.loginWithRedirect
        { redirect_uri: "https://puremess:8000/" }
  let
    config =
      { notifications
      , backendApiUrl: "http://puremess:8081"
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

