module Chat.Api.Http where

import Prelude

import Chat.Presence (Presence)
import Control.Monad.Except (runExcept, throwError)
import Data.Argonaut.Decode (class DecodeJson, JsonDecodeError(..), decodeJson)
import Data.Argonaut.Encode (class EncodeJson, encodeJson)
import Data.Auth.Token (Token)
import Data.Either (Either(..))
import Data.Username (Username)
import Foreign (fail, readString) as Foreign
import Foreign.Generic (class Decode, ForeignError(..)) as Foreign

data SignUpResponse
  = SignedUp
  | AlreadyRegistered

instance Show SignUpResponse where
  show = case _ of
    SignedUp → "Signed Up"
    AlreadyRegistered → "Already Registered"

derive instance Eq SignUpResponse

data SignoutReason
  = Timeout
  | UserAction

derive instance Eq SignoutReason

instance Show SignoutReason where
  show = case _ of
    Timeout → "Timeout"
    UserAction → "UserAction"

instance Foreign.Decode SignoutReason where
  decode f = case runExcept (Foreign.readString f) of
    Left errs → throwError errs
    Right "Timeout" → pure Timeout
    Right "UserAction" → pure UserAction
    Right r →
      Foreign.fail $ Foreign.ForeignError $ "Unknown signout reason: " <> show r

instance EncodeJson SignoutReason where
  encodeJson = show >>> encodeJson

instance DecodeJson SignoutReason where
  decodeJson json = decodeJson json >>= case _ of
    "Timeout" → Right Timeout
    "UserAction" → Right UserAction
    s → Left $ TypeMismatch $ "Expected SignoutReason, got: " <> s

type SignInResponseBody = Token

type SignUpResponseBody = { errors ∷ Array String }

type UserPresence = { username ∷ Username, presence ∷ Presence }

