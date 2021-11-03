module Auth where

import Prelude

import Auth.Hash (Hash(..), Password(..), Salt(..), hashPassword)
import Control.Monad.Error.Class (throwError)
import Control.Monad.Except (runExcept)
import Control.Monad.Except.Trans (mapExceptT)
import Data.Array as Array
import Data.Either (Either(..))
import Data.Enum (enumFromTo)
import Data.Maybe (Maybe(..), fromMaybe)
import Data.Newtype (unwrap)
import Data.String.CodeUnits as String
import Data.Unfoldable (replicateA)
import Database as Db
import Effect (Effect)
import Effect.Class (liftEffect)
import Effect.Random (randomInt)
import Foreign (fail, readInt) as Foreign
import Foreign.Generic (class Decode, ForeignError(..), decode, encode) as Foreign
import SQLite3 as SQLite
import ServerM (ServerM, Server)

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
      Foreign.fail $ Foreign.ForeignError $ "Unknown signout reason: " <> show r

type User =
  { email :: String
  , username :: String
  , password :: String
  }

genSalt :: Effect Salt
genSalt = Salt <<< String.fromCharArray <$> replicateA 32 genChar
  where
  genChar :: Effect Char
  genChar = do
    let
      alphabet = enumFromTo 'A' 'Z'
        <> enumFromTo 'a' 'z'
        <> enumFromTo '0' '9'
    fromMaybe '?' <<< Array.index alphabet
      <$> randomInt 0 (Array.length alphabet - 1)

signup :: SQLite.DBConnection -> User -> Server
signup dbConn user = do
  salt <- liftEffect genSalt
  hash <- hashPassword (Password user.password) salt
  void $ Db.query dbConn
    """
    INSERT INTO users (email, username, password_hash, salt)
    VALUES (?, ?, ?, ?)
    """
    [ Foreign.encode user.email
    , Foreign.encode user.username
    , Foreign.encode hash
    , Foreign.encode salt
    ]

signin :: SQLite.DBConnection -> LoginRequest -> ServerM LoginResult
signin dbConn { username, password } = do
  result <- Db.query dbConn
    "SELECT password_hash, salt FROM users WHERE username = ?"
    [ Foreign.encode username ]
  rows :: _ { password_hash :: Hash, salt :: Salt } <-
    mapExceptT (unwrap >>> pure) (Foreign.decode result)
  case Array.head rows of
    Just { password_hash, salt } ->
      hashPassword (Password password) salt <#> \hash ->
        if hash == password_hash then LoginSuccess else LoginFailure
    Nothing -> pure LoginFailure

signout :: LogoutRequest -> LogoutResult
signout { reason } = LogoutSuccess reason
