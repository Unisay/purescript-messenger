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
import Data.List.NonEmpty (NonEmptyList)
import Data.Newtype (class Newtype)
import Data.String as String
import Data.Username (Username)
import Effect.Aff.Class (class MonadAff)
import Foreign (ForeignError, renderForeignError)
import Foreign.Class (class Decode)
import Foreign.Class (decode) as Foreign
import Foreign.Index (readProp) as Foreign

newtype Error = UserDecodingError (NonEmptyList ForeignError)

instance Show Error where
  show (UserDecodingError errs) =
    String.joinWith "; "
      $ Array.fromFoldable
      $ map renderForeignError errs

newtype User = User
  { email ∷ Email
  , name ∷ Username
  }

derive instance Newtype User _

instance Decode User where
  decode v = ado
    email ← Foreign.readProp "email" v >>= Foreign.decode
    name ← Foreign.readProp "nickname" v >>= Foreign.decode
    in User { email, name }

data Info = Anonymous | Authenticated User

instance Show Info where
  show = case _ of
    Anonymous → "Anonymous"
    Authenticated (User user) → "Authenticated: " <> show user

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
      >>> map Authenticated
      >>> hoistError UserDecodingError
  else pure Anonymous

token ∷ ∀ r m. MonadAsk (Auth0.HasConfig r) m ⇒ MonadAff m ⇒ m Token
token = Auth0.getTokenSilently
