module Database where

import Prelude

import Effect.Aff (Aff, bracket)
import Effect.Aff.Class (class MonadAff, liftAff)
import Effect.Class.Console (log)
import Foreign (Foreign)
import SQLite3 as SQLite

withConnection :: forall a. (SQLite.DBConnection -> Aff a) -> Aff a
withConnection useResource = do
  bracket initResource disposeResource useResource
  where
  initResource = do
    log "Opening DB connection"
    conn <- SQLite.newDB "db/backend.sqlite3"
    _ <- SQLite.queryDB conn
      """
        create table if not exists users (
          email text primary key on conflict fail,
          username text unique on conflict fail,
          password_hash text unique on conflict fail,
          salt text unique on conflict fail
        ) 
      """ []
    pure conn

  disposeResource conn = do
    log "Closing DB connection"
    SQLite.closeDB conn

query
  :: forall m
   . MonadAff m
  => SQLite.DBConnection
  -> SQLite.Query
  -> Array SQLite.Param
  -> m Foreign
query conn q params = liftAff $ SQLite.queryDB conn q params

