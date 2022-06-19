module Auth0 where

import Preamble

import Control.Monad.Reader (class MonadAsk, asks)
import Control.Promise (Promise, toAff)
import Effect.Aff (Aff)
import Effect.Aff.Class (class MonadAff, liftAff)
import Foreign (Foreign)

data Config

foreign import _config ∷ String → Promise Config

clientConfig ∷ String → Aff Config
clientConfig = liftAff <<< toAff <<< _config

data Client

newClient ∷ Config → Aff Client
newClient = toAff <<< _client

foreign import _client ∷ Config → Promise Client

isAuthenticated
  ∷ ∀ c m. MonadAsk (HasClient c) m ⇒ MonadAff m ⇒ m Boolean
isAuthenticated = do
  client ← asks _.auth0Client
  liftAff $ toAff $ _isAuthenticated client

foreign import _isAuthenticated ∷ Client → Promise Boolean

type HasClient r = Record (auth0Client ∷ Client | r)

loginWithPopup ∷ ∀ c m. MonadAsk (HasClient c) m ⇒ MonadAff m ⇒ m Unit
loginWithPopup = do
  client ← asks _.auth0Client
  liftAff $ toAff $ _loginWithPopup client

foreign import _loginWithPopup ∷ Client → Promise Unit

type RedirectOpts = { redirect_uri ∷ String }

loginWithRedirect
  ∷ ∀ c m. MonadAsk (HasClient c) m ⇒ MonadAff m ⇒ RedirectOpts → m Unit
loginWithRedirect opts = do
  client ← asks _.auth0Client
  liftAff $ toAff $ _loginWithRedirect client opts

foreign import _loginWithRedirect ∷ Client → RedirectOpts → Promise Unit

handleRedirectCallback
  ∷ ∀ c m. MonadAsk (HasClient c) m ⇒ MonadAff m ⇒ m Foreign
handleRedirectCallback = do
  client ← asks _.auth0Client
  liftAff $ toAff $ _handleRedirectCallback client

foreign import _handleRedirectCallback ∷ Client → Promise Foreign

type User = Foreign

getUser ∷ ∀ c m. MonadAsk (HasClient c) m ⇒ MonadAff m ⇒ m Foreign
getUser = do
  client ← asks _.auth0Client
  liftAff $ toAff $ _getUser client

foreign import _getUser ∷ Client → Promise User
