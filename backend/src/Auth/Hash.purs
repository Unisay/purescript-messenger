module Auth.Hash where

import Prelude

import Control.Promise (Promise)
import Control.Promise as Promise
import Data.Password (Password)
import Data.Password as Password
import Effect.Aff.Class (class MonadAff, liftAff)
import Foreign.Class (class Decode, class Encode)

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
