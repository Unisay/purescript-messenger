module Auth.Hash where

import Prelude

import Control.Promise (Promise)
import Control.Promise as Promise
import Data.Argonaut.Encode (class EncodeJson)
import Data.Newtype (class Newtype)
import Effect.Aff.Class (class MonadAff, liftAff)
import Foreign.Class (class Encode, class Decode)
import Data.Password (Password)
import Data.Password as Password

-- Token -----------------------------------------------------------------------

newtype Token = Token String

derive instance Newtype Token _
derive newtype instance EncodeJson Token

-- Hash ------------------------------------------------------------------------

newtype Hash = Hash String

derive newtype instance Encode Hash
derive newtype instance Decode Hash
derive newtype instance Eq Hash

-- Salt ------------------------------------------------------------------------

newtype Salt = Salt String

derive newtype instance Encode Salt
derive newtype instance Decode Salt

--------------------------------------------------------------------------------

hashPassword :: forall m. MonadAff m => Password -> Salt -> m Hash
hashPassword pass (Salt salt) =
  _hashPassword (Password.toString pass) salt
    # Promise.toAff
    # map Hash
    # liftAff

foreign import _hashPassword :: String -> String -> Promise String
