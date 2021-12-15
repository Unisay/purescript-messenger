module Chat where

import Prelude

import Auth (Username)
import Control.Monad.Error.Class (throwError)
import Data.Argonaut.Encode (class EncodeJson, encodeJson)
import Database as Db
import Foreign (ForeignError(..), readString)
import Foreign.Generic.Class (class Decode)
import SQLite3 as SQLite
import ServerM (ServerM, liftDbM)
import Data.List.NonEmpty as NEL

users :: SQLite.DBConnection -> ServerM (Array UserStatus)
users dbconn = liftDbM $ Db.query dbconn "SELECT * FROM chat_users" []

data Status = Online | Offline

instance EncodeJson Status where
  encodeJson = case _ of
    Online -> encodeJson "Online"
    Offline -> encodeJson "Offline"

instance Decode Status where
  decode foreignStatus = readString foreignStatus >>= case _ of
    "Online" -> pure Online
    "Offline" -> pure Offline
    invalidStatus -> throwError $ NEL.singleton $ ForeignError $
      "Invalid status value: " <> invalidStatus

type UserStatus = { username :: Username, status :: Status }
