module Auth.Hash where

import Prelude
import Control.Promise as Promise
import Control.Promise (Promise)
import Foreign.Class (class Encode, class Decode)
import ServerM (ServerM)
import Effect.Aff.Class (liftAff)

-- Hash ------------------------------------------------------------------------

newtype Hash = Hash String

derive newtype instance encodeHash :: Encode Hash
derive newtype instance decodeHash :: Decode Hash
derive newtype instance eqHash :: Eq Hash

-- Password --------------------------------------------------------------------

newtype Password = Password String

-- Salt ------------------------------------------------------------------------

newtype Salt = Salt String

derive newtype instance encodeSalt :: Encode Salt
derive newtype instance decodeSalt :: Decode Salt

--------------------------------------------------------------------------------

hashPassword :: Password -> Salt -> ServerM Hash
hashPassword (Password pass) (Salt salt) =
  _hashPassword pass salt
    # Promise.toAff
    # map Hash
    # liftAff

foreign import _hashPassword :: String -> String -> Promise String