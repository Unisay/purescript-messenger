module Auth.Hash where

import Prelude

import Control.Promise (Promise)
import Control.Promise as Promise
import Data.Argonaut.Encode (class EncodeJson)
import Data.Newtype (class Newtype)
import Effect.Aff.Class (class MonadAff, liftAff)
import Foreign.Class (class Encode, class Decode)

-- Token -----------------------------------------------------------------------

newtype Token = Token String

derive instance Newtype Token _
derive newtype instance EncodeJson Token

-- Hash ------------------------------------------------------------------------

newtype Hash = Hash String

derive newtype instance Encode Hash
derive newtype instance Decode Hash
derive newtype instance Eq Hash

-- Password --------------------------------------------------------------------

newtype Password = Password String

derive newtype instance Decode Password

-- Salt ------------------------------------------------------------------------

newtype Salt = Salt String

derive newtype instance Encode Salt
derive newtype instance Decode Salt

--------------------------------------------------------------------------------

hashPassword :: forall m. MonadAff m => Password -> Salt -> m Hash
hashPassword (Password pass) (Salt salt) =
  _hashPassword pass salt
    # Promise.toAff
    # map Hash
    # liftAff

foreign import _hashPassword :: String -> String -> Promise String
