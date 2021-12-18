module Chat where

import Prelude

import Auth (Username)
import Control.Monad.Error.Class (throwError)
import Data.Argonaut.Encode (class EncodeJson, encodeJson)
import Data.List.NonEmpty as NEL
import Database as Db
import Foreign (ForeignError(..), readString)
import Foreign.Class as Foreign
import Foreign.Generic.Class (class Decode)
import ServerM (ServerM, liftDbM)

users :: ServerM (Array UserStatus)
users = liftDbM $ Db.query "SELECT * FROM chat_users" []

enter :: Username -> ServerM Unit
enter username = liftDbM $
  Db.execute
    """
      INSERT OR IGNORE INTO chat_users (username, status)
      VALUES (?, ?)
    """
    [ Foreign.encode username, Foreign.encode Online ]

exit :: Username -> ServerM Unit
exit username = liftDbM $ Db.execute
  "DELETE FROM chat_users WHERE username = ?"
  [ Foreign.encode username ]

data Status = Online | Away | Offline

instance Show Status where
  show = case _ of
    Online -> "Online"
    Away -> "Away"
    Offline -> "Offline"

instance Foreign.Encode Status where
  encode = Foreign.encode <<< show

instance EncodeJson Status where
  encodeJson = encodeJson <<< show

instance Decode Status where
  decode foreignStatus = readString foreignStatus >>= case _ of
    "Online" -> pure Online
    "Away" -> pure Away
    "Offline" -> pure Offline
    invalidStatus -> throwError $ NEL.singleton $ ForeignError $
      "Invalid status value: " <> invalidStatus

type UserStatus = { username :: Username, status :: Status }
