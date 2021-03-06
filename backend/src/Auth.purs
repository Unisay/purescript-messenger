module Auth where

import Prelude

import Auth.Hash (Hash, Salt(..), hashPassword)
import Chat.Api.Http (SignoutReason)
import Data.Array as Array
import Data.Auth.Token (Token)
import Data.Auth.Token as Token
import Data.DateTime (adjust)
import Data.Either (Either, hush, note)
import Data.Email (Email)
import Data.Enum (enumFromTo)
import Data.List.NonEmpty (NonEmptyList)
import Data.Maybe (Maybe(..), fromMaybe)
import Data.Newtype (wrap)
import Data.Password (Password)
import Data.String.CodeUnits as String
import Data.Time.Duration (Minutes(..))
import Data.Unfoldable (replicateA)
import Data.Username (Username)
import Data.Username as Username
import Database as Db
import Effect (Effect)
import Effect.Aff.Class (liftAff)
import Effect.Class (liftEffect)
import Effect.Now (nowDateTime)
import Effect.Random (randomInt)
import Foreign.Generic (encode) as Foreign
import Node.Jwt as Jwt
import ServerM (ServerM, liftDbM)

data SigninResult = SigninSuccess Token | SigninFailure
data SignupResult = SignedUp | UserInfoUpdated | NotSignedUpInvalidCredentials
type SignoutRequest = { reason ∷ SignoutReason }
data SignoutResult = SignoutSuccess SignoutReason

type UserInfo =
  { email ∷ Email
  , username ∷ Username
  , password ∷ Password
  }

genSalt ∷ Effect Salt
genSalt = Salt <<< String.fromCharArray <$> replicateA 32 genChar
  where
  genChar ∷ Effect Char
  genChar = do
    let
      alphabet = enumFromTo 'A' 'Z'
        <> enumFromTo 'a' 'z'
        <> enumFromTo '0' '9'
    fromMaybe '?' <<< Array.index alphabet
      <$> randomInt 0 (Array.length alphabet - 1)

signup ∷ UserInfo → ServerM SignupResult
signup user = do
  hashedData ← usernameHashedData user.username
  case hashedData of
    Nothing → insertRecord $> SignedUp
    Just { password_hash, salt } → do
      password_hash' ← hashPassword user.password salt
      if password_hash' == password_hash then updateRecord $> UserInfoUpdated
      else pure NotSignedUpInvalidCredentials
  where
  insertRecord ∷ ServerM Unit
  insertRecord = do
    salt ← liftEffect genSalt
    hash ← hashPassword user.password salt
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

  updateRecord ∷ ServerM Unit
  updateRecord = liftDbM $ Db.execute "UPDATE users SET email = ?"
    [ Foreign.encode user.email ]

signin ∷ Jwt.Secret → Username → Password → ServerM SigninResult
signin secret username password =
  usernameHashedData username >>= case _ of
    Just { password_hash, salt } →
      hashPassword password salt >>= \hash → do
        now ← liftEffect nowDateTime
        token ← liftAff $ Jwt.sign
          secret
          Jwt.defaultHeaders
          Jwt.defaultClaims
            { sub = Just (Username.toString username)
            , exp = wrap <$> adjust (Minutes 30.0) now
            }
        pure
          if hash == password_hash then SigninSuccess (Token.unsafe token)
          else SigninFailure
    Nothing → pure SigninFailure

usernameHashedData
  ∷ Username
  → ServerM (Maybe { password_hash ∷ Hash, salt ∷ Salt })
usernameHashedData username =
  Array.head <$> liftDbM
    ( Db.query
        "SELECT password_hash, salt FROM users WHERE username = ?"
        [ Foreign.encode username ]
    )

signout ∷ SignoutRequest → ServerM SignoutResult
signout { reason } = pure $ SignoutSuccess reason

type TokenErrors = NonEmptyList String

tokenInfo ∷ Token → Jwt.Secret → Either TokenErrors Username
tokenInfo token secret = do
  tok ∷ Jwt.Token () "token" ← Jwt.verify secret (Token.toString token)
  strUsername ← note (pure "sub claim not found") tok.claims.sub
  note (pure "sub claim is invalid") $ hush (Username.parse strUsername)
