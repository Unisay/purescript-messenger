module Database where

import Prelude

import Control.Monad.Except (ExceptT, mapExceptT)
import Data.Bifunctor (lmap)
import Data.Generic.Rep (class Generic)
import Data.Newtype (unwrap, wrap)
import Data.Show.Generic (genericShow)
import Effect.Aff (Aff, bracket, try)
import Effect.Aff as Aff
import Effect.Aff.Class (class MonadAff, liftAff)
import Effect.Class.Console (log)
import Foreign (MultipleErrors)
import Foreign.Class (class Decode, decode)
import SQLite3 as SQLite
import Effect.Exception as Ex
import Data.String as String

data DbConstraint = Username | Email

instance show :: Show DbConstraint where
  show = case _ of
    Username -> "users.username"
    Email -> "users.email"

data Error
  = ConstraintViolation DbConstraint
  | Decoding MultipleErrors
  | Other String

derive instance genericDatabaseError :: Generic Error _
instance showDatabaseError :: Show Error where
  show = genericShow

withConnection :: forall a. (SQLite.DBConnection -> Aff a) -> Aff a
withConnection useResource = do
  bracket initResource disposeResource useResource
  where
  initResource = do
    log "Opening DB connection"
    conn <- SQLite.newDB "db/backend.sqlite3"
    let
      run s = void $ SQLite.queryDB conn s []
      createTable table fields = run do
        String.joinWith " "
          [ "CREATE TABLE IF NOT EXISTS"
          , table
          , "("
          , String.joinWith "," fields
          , ")"
          ]
    run "PRAGMA foreign_keys = ON"
    createTable "users"
      [ "email TEXT PRIMARY KEY ON CONFLICT FAIL"
      , "username TEXT UNIQUE ON CONFLICT FAIL"
      , "password_hash TEXT UNIQUE ON CONFLICT FAIL"
      , "salt TEXT UNIQUE ON CONFLICT FAIL"
      ]
    createTable "chat_users"
      [ "username TEXT"
      , "status TEXT"
      , "FOREIGN KEY(username) REFERENCES users(username)"
      ]
    pure conn
  disposeResource conn = do
    log "Closing DB connection"
    SQLite.closeDB conn

type DbM m a = ExceptT Error m a

execute
  :: forall m
   . MonadAff m
  => SQLite.DBConnection
  -> SQLite.Query
  -> Array SQLite.Param
  -> DbM m Unit
execute = query

query
  :: forall m a
   . MonadAff m
  => Decode a
  => SQLite.DBConnection
  -> SQLite.Query
  -> Array SQLite.Param
  -> DbM m a
query conn q params = do
  f <- wrap $ map (lmap adaptError) $ liftAff $ try $
    SQLite.queryDB conn q params
  mapExceptT (pure <<< lmap Decoding <<< unwrap) (decode f)

adaptError :: Aff.Error -> Error
adaptError e = case Ex.message e of
  "SQLITE_CONSTRAINT: UNIQUE constraint failed: users.username" ->
    ConstraintViolation Username
  "SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email" ->
    ConstraintViolation Email
  _ -> Other $ Ex.message e

