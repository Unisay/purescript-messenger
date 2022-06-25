module Auth where

import Preamble

import Auth0 as Auth0
import Control.Monad.Error.Class (class MonadThrow)
import Control.Monad.Error.Hoist (hoistError)
import Control.Monad.Except (runExcept)
import Control.Monad.Reader (class MonadAsk)
import Data.Array as Array
import Data.Auth.Token (Token)
import Data.Email (Email)
import Data.Email as Email
import Data.List.NonEmpty (NonEmptyList)
import Data.String as String
import Data.Username (Username)
import Data.Username as Username
import Effect.Aff.Class (class MonadAff)
import Foreign (ForeignError, renderForeignError)
import Foreign.Class as Foreign

newtype Error = UserDecodingError (NonEmptyList ForeignError)

instance Show Error where
  show (UserDecodingError errs) =
    String.joinWith "; "
      $ Array.fromFoldable
      $ map renderForeignError errs

type Auth0User =
  { email ∷ String
  , email_verified ∷ Boolean
  , family_name ∷ String
  , given_name ∷ String
  , name ∷ String
  , nickname ∷ String
  , picture ∷ String
  , updated_at ∷ String
  }

type User =
  { email ∷ Email
  , name ∷ Username
  }

data Info = Anonymous | Authenticated User

instance Show Info where
  show = case _ of
    Anonymous → "Anonymous"
    Authenticated user → "Authenticated: " <> show user

userInfo
  ∷ ∀ m r
  . MonadAff m
  ⇒ MonadThrow Error m
  ⇒ MonadAsk (Auth0.HasConfig r) m
  ⇒ m Info
userInfo = do
  isAuthenticated ← Auth0.isAuthenticated
  if isAuthenticated then
    Auth0.getUser >>= Foreign.decode
      >>> runExcept
      >>> map (fromAuth0User >>> Authenticated)
      >>> hoistError UserDecodingError
  else pure Anonymous
  where
  fromAuth0User ∷ Auth0User → User
  fromAuth0User a0u =
    { email: Email.unsafe a0u.email
    , name: Username.unsafe a0u.name
    }

token ∷ ∀ r m. MonadAsk (Auth0.HasConfig r) m ⇒ MonadAff m ⇒ m Token
token = Auth0.getTokenSilently
