module Auth where

import Prelude

import Control.Monad.Error.Class (throwError)
import Control.Monad.Except (runExcept)
import Control.Monad.Except.Trans (mapExceptT)
import Data.Array as Array
import Data.Either (Either(..))
import Data.Maybe (fromMaybe)
import Data.Newtype (unwrap)
import Database as Db
import Foreign (fail, readInt) as Foreign
import Foreign.Generic (class Decode, ForeignError(..), decode, encode) as Foreign
import SQLite3 as SQLite
import ServerM (ServerM)

type LoginRequest = { username :: String, password :: String }
data LoginResult = LoginSuccess | LoginFailure
type LogoutRequest = { reason :: LogoutReason }
data LogoutReason = Timeout | UserAction
data LogoutResult = LogoutSuccess LogoutReason

instance decodeLogoutReason :: Foreign.Decode LogoutReason where
  decode f = case runExcept (Foreign.readInt f) of
    Left errs -> throwError errs
    Right 0 -> pure Timeout
    Right 1 -> pure UserAction
    Right r ->
      Foreign.fail $ Foreign.ForeignError $ "Unknown logout reason: " <> show r

type User =
  { email :: String
  , username :: String
  , password :: String
  }

login :: SQLite.DBConnection -> LoginRequest -> ServerM LoginResult
login dbConn { username, password } = do
  result <- Db.query dbConn
    "SELECT * FROM users WHERE username = ? AND password = ?"
    [ Foreign.encode username, Foreign.encode password ]
  users :: Array User <- mapExceptT (unwrap >>> pure) (Foreign.decode result)
  pure $ fromMaybe LoginFailure $ Array.head $ LoginSuccess <$ users

logout :: LogoutRequest -> LogoutResult
logout { reason } = LogoutSuccess reason
