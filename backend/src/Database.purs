module Database where

import Prelude

import Effect.Aff (Aff, bracket)
import Effect.Aff.Class (class MonadAff, liftAff)
import Foreign (Foreign)
import SQLite3 as SQLite

withConnection :: forall a. (SQLite.DBConnection -> Aff a) -> Aff a
withConnection useResource = do
  bracket initResource disposeResource useResource
  where 
   initResource = SQLite.newDB "db/backend.sqlite3"
   disposeResource = SQLite.closeDB

query
  :: forall m
   . MonadAff m
  => SQLite.DBConnection
  -> SQLite.Query
  -> Array SQLite.Param
  -> m Foreign
query conn q params = liftAff $ SQLite.queryDB conn q params

