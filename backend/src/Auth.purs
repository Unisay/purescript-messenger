module Auth where

import Prelude

import Auth.Hash (Hash, Password, Salt(..), Token(..), hashPassword)
import Control.Monad.Error.Class (throwError)
import Control.Monad.Except (runExcept)
import Data.Argonaut.Encode (class EncodeJson)
import Data.Array as Array
import Data.DateTime (adjust)
import Data.Either (Either(..), note)
import Data.Enum (enumFromTo)
import Data.Generic.Rep (class Generic)
import Data.List.NonEmpty (NonEmptyList)
import Data.Maybe (Maybe(..), fromMaybe)
import Data.Newtype (class Newtype, unwrap, wrap)
import Data.Show.Generic (genericShow)
import Data.String.CodeUnits as String
import Data.Time.Duration (Minutes(..))
import Data.Unfoldable (replicateA)
import Database as Db
import Effect (Effect)
import Effect.Aff.Class (liftAff)
import Effect.Class (liftEffect)
import Effect.Now (nowDateTime)
import Effect.Random (randomInt)
import Foreign (fail, readInt) as Foreign
import Foreign.Generic (class Decode, ForeignError(..), encode) as Foreign
import Foreign.Generic (class Decode, class Encode)
import Node.Jwt as Jwt
import SQLite3 as SQLite
import ServerM (ServerM, liftDbM)

data SigninResult = SigninSuccess Token | SigninFailure
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

derive instance Newtype Username _
derive instance Generic Username _
instance Show Username where
  show = genericShow

derive newtype instance Eq Username
derive newtype instance Encode Username
derive newtype instance Decode Username
derive newtype instance EncodeJson Username

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

signup :: UserInfo -> ServerM SignupResult
signup user = do
  hashedData <- usernameHashedData user.username
  case hashedData of
    Nothing -> insertRecord $> SignedUp
    Just { password_hash, salt } -> do
      password_hash' <- hashPassword user.password salt
      if password_hash' == password_hash then updateRecord $> UserInfoUpdated
      else pure NotSignedUpInvalidCredentials
  where
  insertRecord :: ServerM Unit
  insertRecord = do
    salt <- liftEffect genSalt
    hash <- hashPassword user.password salt
    liftDbM
      ( Db.execute
          """
            INSERT INTO users (email, username, password_hash, salt)
            VALUES (?, ?, ?, ?)
            """
          [ Foreign.encode user.email
          , Foreign.encode user.username
          , Foreign.encode hash
          , Foreign.encode salt
          ]
      )

  updateRecord :: ServerM Unit
  updateRecord = liftDbM $ Db.execute "UPDATE users SET email = ?"
    [ Foreign.encode user.email ]

signin :: Jwt.Secret -> Username -> Password -> ServerM SigninResult
signin secret username password =
  usernameHashedData username >>= case _ of
    Just { password_hash, salt } ->
      hashPassword password salt >>= \hash -> do
        now <- liftEffect nowDateTime
        token <- liftAff $ Jwt.sign
          secret
          Jwt.defaultHeaders
          Jwt.defaultClaims
            { sub = Just (unwrap username)
            , exp = wrap <$> adjust (Minutes 30.0) now
            }
        pure
          if hash == password_hash then SigninSuccess (Token token)
          else SigninFailure
    Nothing -> pure SigninFailure

usernameHashedData
  :: Username
  -> ServerM (Maybe { password_hash :: Hash, salt :: Salt })
usernameHashedData username =
  Array.head <$> liftDbM
    ( Db.query
        "SELECT password_hash, salt FROM users WHERE username = ?"
        [ Foreign.encode username ]
    )

signout :: SignoutRequest -> SignoutResult
signout { reason } = SignoutSuccess reason

type TokenErrors = NonEmptyList String

tokenInfo :: Token -> Jwt.Secret -> Either TokenErrors Username
tokenInfo token secret = do
  tok :: Jwt.Token () _ <- Jwt.verify secret (unwrap token)
  Username <$> note (pure "sub claim not found") tok.claims.sub
