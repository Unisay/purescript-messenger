module Database where

import Data.Either (Either(..), either)
import Prelude

import Control.Monad.Except (ExceptT, lift, mapExceptT)
import Data.Generic.Rep (class Generic)
import Data.Newtype (unwrap)
import Data.Show.Generic (genericShow)
import Effect.Aff (Aff, bracket)
import Effect.Aff.Class (class MonadAff, liftAff)
import Effect.Class.Console (log)
import Foreign (MultipleErrors)
import Foreign.Class (class Decode, decode)
import SQLite3 as SQLite

data Error
  = Constraint String
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
    _ <- SQLite.queryDB conn
      """
        create table if not exists users (
          email text primary key on conflict fail,
          username text unique on conflict fail,
          password_hash text unique on conflict fail,
          salt text unique on conflict fail
        ) 
      """
      []
    pure conn

  disposeResource conn = do
    log "Closing DB connection"
    SQLite.closeDB conn

query
  :: forall a m
   . MonadAff m
  => Decode a
  => SQLite.DBConnection
  -> SQLite.Query
  -> Array SQLite.Param
  -> ExceptT Error m a
query conn q params = do
  foreignA <- lift (liftAff (SQLite.queryDB conn q params))
  mapExceptT
    (pure <<< either (Left <<< Decoding) Right <<< unwrap)
    (decode foreignA)
-- `catchError` \err ->  ?x

