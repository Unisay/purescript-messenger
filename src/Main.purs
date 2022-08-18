module Main where

import Preamble

import Auth0 as Auth0
import Component.Router as Router
import Data.Array as Array
import Data.Foldable (for_)
import Data.Route as Route
import Data.String as String
import Data.Tuple (Tuple(..))
import Effect.Aff (launchAff_)
import Effect.Class.Console (warnShow)
import Foreign (unsafeToForeign)
import Halogen as H
import Halogen.Aff (awaitBody, runHalogenAff)
import Halogen.Subscription as Subscription
import Halogen.VDom.Driver (runUI)
import Routing.Duplex as RD
import Routing.Hash (matchesWith)
import URI.Extra.QueryPairs as QP
import URI.Query as Q
import Web.HTML (window)
import Web.HTML.HTMLDocument (title)
import Web.HTML.History (DocumentTitle(..), URL(..), replaceState)
import Web.HTML.Location (search)
import Web.HTML.Window (document, history, localStorage, location)

main ∷ Effect Unit
main = runHalogenAff do
  let backendApiUrl = "https://puremess:8081"
  auth0Client ← Auth0.newClient =<<
    Auth0.clientConfig (backendApiUrl <> "/auth_config.json")

  params ← queryParams

  for_ (paramValue "error" params <* paramValue "state" params) warnShow
  -- Homework: add error_description to the warning

  when (paramExists "code" params && paramExists "state" params) do
    void $ Auth0.handleRedirectCallback auth0Client
    liftEffect resetQueryString

  storage ← liftEffect $ window >>= localStorage
  notifications ← liftEffect Subscription.create
  let
    auth0Config =
      { client: auth0Client
      , redirectUri: "https://puremess:8000/"
      }
    appConfig =
      { notifications
      , backendApiUrl
      , storage
      , auth0Config
      }
  router ← awaitBody >>= runUI Router.component appConfig
  void $ liftEffect $ matchesWith (RD.parse Route.codec) \old new →
    when (old /= Just new) do
      launchAff_
        $ map (fromMaybe unit)
        $ router.query
        $ H.mkTell
        $ Router.Navigate new

type QryParams = Array (Tuple QP.Key (Maybe QP.Value))

queryParams ∷ ∀ m. MonadEffect m ⇒ m QryParams
queryParams = do
  qry ← liftEffect $ window >>= location >>= search
  case QP.parse pure pure $ Q.fromString $ String.drop 1 qry of
    Left err → warnShow err $> mempty
    Right (QP.QueryPairs ps) → pure ps

paramValue ∷ String → QryParams → Maybe String
paramValue key params =
  case Array.find (\(Tuple k _) → QP.keyToString k == key) params of
    Nothing → Nothing
    Just (Tuple _ Nothing) → Nothing
    Just (Tuple _ v) → map QP.valueToString v

paramExists ∷ String → QryParams → Boolean
paramExists key =
  maybe false (const true) <<<
    Array.find (\(Tuple k _) → QP.keyToString k == key)

resetQueryString ∷ Effect Unit
resetQueryString = do
  w ← window
  t ← document w >>= title
  history w >>= replaceState state (DocumentTitle t) (URL "/")
  where
  state = unsafeToForeign {}
