module Main where

import Preamble

import Auth0 as Auth
import Component.Router as Router
import Control.Monad.Except (runExcept)
import Control.Monad.Reader (runReaderT)
import Data.Route as Route
import Data.String.Utils as Str
import Effect.Aff (launchAff_)
import Foreign (F, unsafeToForeign)
import Foreign.Class as Foreign
import Halogen as H
import Halogen.Aff (awaitBody, runHalogenAff)
import Halogen.Subscription as Subscription
import Halogen.VDom.Driver (runUI)
import Routing.Duplex as RD
import Routing.Hash (matchesWith)
import Web.HTML (window)
import Web.HTML.HTMLDocument (title)
import Web.HTML.History (DocumentTitle(..), URL(..), replaceState)
import Web.HTML.Location (search)
import Web.HTML.Window (document, history, localStorage, location)

main ∷ Effect Unit
main = runHalogenAff do
  let backendApiUrl = "https://puremess:8081"
  auth0Config ← Auth.clientConfig (backendApiUrl <> "/auth_config.json")
  auth0Client ← Auth.newClient auth0Config
  qry ← liftEffect $ window >>= location >>= search
  when (Str.includes "code=" qry && Str.includes "state=" qry) do
    void $ Auth0.handleRedirectCallback
    liftEffect resetQueryString
  storage ← liftEffect $ window >>= localStorage
  notifications ← liftEffect Subscription.create
  let
    appConfig =
      { notifications
      , backendApiUrl
      , storage
      , auth0Client
      }
  router ← awaitBody >>= runUI Router.component appConfig
  void $ liftEffect $ matchesWith (RD.parse Route.codec) \old new →
    when (old /= Just new) do
      launchAff_
        $ map (fromMaybe unit)
        $ router.query
        $ H.mkTell
        $ Router.Navigate new

resetQueryString ∷ Effect Unit
resetQueryString = do
  w ← window
  t ← document w >>= title
  history w >>= replaceState state (DocumentTitle t) (URL "/")
  where
  state = unsafeToForeign {}
