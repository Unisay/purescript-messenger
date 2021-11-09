module Auth where

import Prelude

import Auth.Hash (Hash, Password(..), Salt(..), hashPassword)
import Control.Monad.Error.Class (throwError)
import Control.Monad.Except (runExcept, withExceptT)
import Data.Array as Array
import Data.Either (Either(..))
import Data.Enum (enumFromTo)
import Data.Maybe (Maybe(..), fromMaybe)
import Data.Newtype (wrap)
import Data.String.CodeUnits as String
import Data.Unfoldable (replicateA)
import Database as Db
import Effect (Effect)
import Effect.Class (liftEffect)
import Effect.Random (randomInt)
import Foreign (fail, readInt) as Foreign
import Foreign.Generic (class Decode, ForeignError(..), encode) as Foreign
import SQLite3 as SQLite
import ServerM (Error(..), ServerM)

data SignupResult = SignupSuccess | UserExists
type SigninRequest = { username :: String, password :: String }
data SigninResult = SigninSuccess | SigninFailure
type SignoutRequest = { reason :: SignoutReason }
data SignoutReason = Timeout | UserAction
data SignoutResult = SignoutSuccess SignoutReason

instance decodeLogoutReason :: Foreign.Decode SignoutReason where
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

signup :: SQLite.DBConnection -> User -> ServerM SignupResult
signup dbConn user = do
  salt <- liftEffect genSalt
  hash <- hashPassword (Password user.password) salt
  wrap $ withExceptT DatabaseErr $ Db.execute dbConn
    """
      INSERT INTO users (email, username, password_hash, salt)
      VALUES (?, ?, ?, ?)
      """
    [ Foreign.encode user.email
    , Foreign.encode user.username
    , Foreign.encode hash
    , Foreign.encode salt
    ]
  pure SignupSuccess

signin :: SQLite.DBConnection -> SigninRequest -> ServerM SigninResult
signin dbConn { username, password } = do
  rows :: Array { password_hash :: Hash, salt :: Salt } <-
    wrap $ withExceptT DatabaseErr $ Db.query dbConn
      "SELECT password_hash, salt FROM users WHERE username = ?"
      [ Foreign.encode username ]

  case Array.head rows of
    Just { password_hash, salt } ->
      hashPassword (Password password) salt <#> \hash ->
        if hash == password_hash then SigninSuccess else SigninFailure
    Nothing -> pure SigninFailure

signout :: SignoutRequest -> SignoutResult
signout { reason } = SignoutSuccess reason
