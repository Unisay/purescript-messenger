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
import SQLite3 as SQLite
import ServerM (ServerM, liftDbM)

users :: SQLite.DBConnection -> ServerM (Array UserStatus)
users dbconn = liftDbM $ Db.query dbconn "SELECT * FROM chat_users" []

enter :: SQLite.DBConnection -> Username -> ServerM Unit
enter dbconn username = liftDbM $ Db.execute dbconn
  """
    INSERT OR IGNORE INTO chat_users (username, status)
    VALUES (?, ?)
  """
  [ Foreign.encode username, Foreign.encode Online]

exit :: SQLite.DBConnection -> Username -> ServerM Unit
exit dbconn username = liftDbM $ Db.execute dbconn
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
