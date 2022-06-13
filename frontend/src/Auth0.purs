module Auth0 where

import Preamble

import Control.Monad.Reader (class MonadAsk, asks)
import Control.Promise (Promise, toAff, toAffE)
import Effect.Aff (Aff)
import Effect.Aff.Class (class MonadAff, liftAff)

data Client

newClient ∷ Aff Client
newClient = toAffE _client

foreign import _client ∷ Effect (Promise Client)

isAuthenticated ∷ Client → Aff Boolean
isAuthenticated = toAff <<< _isAuthenticated

foreign import _isAuthenticated ∷ Client → Promise Boolean

type HasClient r = Record (auth0Client ∷ Client | r)

loginWithPopup ∷ ∀ c m. MonadAsk (HasClient c) m ⇒ MonadAff m ⇒ m Unit
loginWithPopup = do
  client ← asks _.auth0Client
  liftAff $ toAff $ _loginWithPopup client

foreign import _loginWithPopup ∷ Client → Promise Unit

type RedirectOpts = { redirect_url ∷ String }

loginWithRedirect
  ∷ ∀ c m. MonadAsk (HasClient c) m ⇒ MonadAff m ⇒ RedirectOpts → m Unit
loginWithRedirect opts = do
  client ← asks _.auth0Client
  liftAff $ toAff $ _loginWithRedirect client opts

foreign import _loginWithRedirect ∷ Client → RedirectOpts → Promise Unit

