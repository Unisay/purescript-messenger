module Auth where

import Prelude

import Auth.Hash (Hash, Password, Salt(..), hashPassword)
import Control.Monad.Error.Class (throwError)
import Control.Monad.Except (runExcept)
import Data.Array as Array
import Data.Either (Either(..))
import Data.Enum (enumFromTo)
import Data.Maybe (Maybe(..), fromMaybe)
import Data.String.CodeUnits as String
import Data.Unfoldable (replicateA)
import Database as Db
import Effect (Effect)
import Effect.Class (liftEffect)
import Effect.Random (randomInt)
import Foreign (fail, readInt) as Foreign
import Foreign.Generic (class Decode, ForeignError(..), encode) as Foreign
import Foreign.Generic (class Decode, class Encode)
import SQLite3 as SQLite
import ServerM (ServerM, liftDbM)

data SigninResult = SigninSuccess | SigninFailure
data SignupResult = SignedUp | UserInfoUpdated | NotSignedUpInvalidCredentials
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

type UserInfo =
  { email :: String
  , username :: Username
  , password :: Password
  }

newtype Username = Username String

derive newtype instance Encode Username
derive newtype instance Decode Username

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

signup :: SQLite.DBConnection -> UserInfo -> ServerM SignupResult
signup dbConn user = do
  -- Выбираем из базы данных записи по username: salt
  hashedData <- usernameHashedData dbConn user.username
  case hashedData of
    -- Если ничего не найдено, то вставляем новую запись
    Nothing -> insertRecord $> SignedUp
    -- Если найдено, 
    Just { password_hash, salt } -> do
      -- то берём соль и солим присланный пароль.
      password_hash' <- hashPassword user.password salt
      -- Если посоленный пароль совпадает с сохраненным, 
      if password_hash' == password_hash
      -- то обновляем данные пользователя   
      then updateRecord $> UserInfoUpdated
      -- Иначе обрываем процедуру.
      else pure NotSignedUpInvalidCredentials 
  where
  insertRecord = do
    salt <- liftEffect genSalt
    hash <- hashPassword user.password salt
    liftDbM $ Db.execute dbConn
      """
        INSERT INTO users (email, username, password_hash, salt)
        VALUES (?, ?, ?, ?)
        """
      [ Foreign.encode user.email
      , Foreign.encode user.username
      , Foreign.encode hash
      , Foreign.encode salt
      ]

  updateRecord = liftDbM $ Db.execute dbConn "UPDATE users SET email = ?"
    [ Foreign.encode user.email ]

signin :: SQLite.DBConnection -> Username -> Password -> ServerM SigninResult
signin dbConn username password =
  usernameHashedData dbConn username >>= case _ of
    Just { password_hash, salt } ->
      hashPassword password salt <#> \hash ->
        if hash == password_hash then SigninSuccess else SigninFailure
    Nothing -> pure SigninFailure

usernameHashedData
  :: SQLite.DBConnection
  -> Username
  -> ServerM (Maybe { password_hash :: Hash, salt :: Salt })
usernameHashedData dbConn username =
  map Array.head $ liftDbM $ Db.query dbConn
    "SELECT password_hash, salt FROM users WHERE username = ?"
    [ Foreign.encode username ]

signout :: SignoutRequest -> SignoutResult
signout { reason } = SignoutSuccess reason
