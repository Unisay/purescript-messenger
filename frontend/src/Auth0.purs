module Auth0 where

import Preamble

import Control.Monad.Reader (class MonadAsk, asks)
import Control.Promise (Promise, toAff, toAffE)
import Data.Auth.Token (Token)
import Data.Auth.Token as Token
import Effect.Aff (Aff)
import Effect.Aff.Class (class MonadAff, liftAff)
import Foreign (Foreign)

type Config =
  { client ∷ Client
  , redirectUri ∷ String
  }

type HasConfig r = { auth0Config ∷ Config | r }

type RedirectOpts = { redirect_uri ∷ String }

data ClientConfig

foreign import _config ∷ String → Effect (Promise ClientConfig)

clientConfig ∷ String → Aff ClientConfig
clientConfig = liftAff <<< toAffE <<< _config

data Client

newClient ∷ ClientConfig → Aff Client
newClient = toAffE <<< _client

foreign import _client ∷ ClientConfig → Effect (Promise Client)

isAuthenticated
  ∷ ∀ c m. MonadAsk (HasConfig c) m ⇒ MonadAff m ⇒ m Boolean
isAuthenticated =
  asks _.auth0Config.client >>= _isAuthenticated >>> toAff >>> liftAff

foreign import _isAuthenticated ∷ Client → Promise Boolean

loginWithPopup ∷ ∀ c m. MonadAsk (HasConfig c) m ⇒ MonadAff m ⇒ m Unit
loginWithPopup =
  asks _.auth0Config.client >>= _loginWithPopup >>> toAffE >>> liftAff

foreign import _loginWithPopup ∷ Client → Effect (Promise Unit)

loginWithRedirect ∷ ∀ c m. MonadAsk (HasConfig c) m ⇒ MonadAff m ⇒ m Unit
loginWithRedirect = do
  { client, redirectUri } ← asks _.auth0Config
  liftAff $ toAff $ _loginWithRedirect client { redirect_uri: redirectUri }

foreign import _loginWithRedirect ∷ Client → RedirectOpts → Promise Unit

handleRedirectCallback ∷ ∀ m. MonadAff m ⇒ Client → m Foreign
handleRedirectCallback = _handleRedirectCallback >>> toAff >>> liftAff

foreign import _handleRedirectCallback ∷ Client → Promise Foreign

type User = Foreign

getUser ∷ ∀ c m. MonadAsk (HasConfig c) m ⇒ MonadAff m ⇒ m User
getUser = asks _.auth0Config.client >>= _getUser >>> toAff >>> liftAff

foreign import _getUser ∷ Client → Promise Foreign

getTokenSilently ∷ ∀ c m. MonadAsk (HasConfig c) m ⇒ MonadAff m ⇒ m Token
getTokenSilently =
  asks _.auth0Config.client
    >>= _getTokenSilently
    >>> toAff
    >>> map Token.unsafe
    >>> liftAff

foreign import _getTokenSilently ∷ Client → Promise String

buildAuthorizeUrl ∷ ∀ c m. MonadAsk (HasConfig c) m ⇒ MonadAff m ⇒ m String
buildAuthorizeUrl = do
  { client, redirectUri } ← asks _.auth0Config
  liftAff $ toAff $ _buildAuthorizeUrl client { redirect_uri: redirectUri }

foreign import _buildAuthorizeUrl ∷ Client → RedirectOpts → Promise String
