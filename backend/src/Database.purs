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
import Unsafe.Coerce (unsafeCoerce)

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

execute
  :: forall a m
   . MonadAff m
  => SQLite.DBConnection
  -> SQLite.Query
  -> Array SQLite.Param
  -> ExceptT Error m Unit
execute conn q params = unsafeCoerce unit

query
  :: forall a m
   . MonadAff m
  => Decode a
  => SQLite.DBConnection
  -> SQLite.Query
  -> Array SQLite.Param
  -> ExceptT Error m a
query conn q params = do
  f <- wrap $ map (lmap adaptError) $ liftAff $ try $
    SQLite.queryDB conn q params
  mapExceptT (pure <<< lmap Decoding <<< unwrap) (decode f)
  where
  adaptError :: Aff.Error -> Error
  -- SQLITE_CONSTRAINT: UNIQUE constraint failed: users.username
  adaptError ae = Other $ Aff.message ae

