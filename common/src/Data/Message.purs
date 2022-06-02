module Data.Message
  ( toString
  , Message(..)
  , parse
  ) where

import Preamble

import Data.Argonaut.Decode (class DecodeJson, JsonDecodeError(..), decodeJson)
import Data.Argonaut.Encode (class EncodeJson, encodeJson)
import Data.Array.NonEmpty (NonEmptyArray)
import Data.DateTime (DateTime)
import Data.DateTime.Instant (toDateTime)
import Data.DateTime.Instant as Instant
import Data.Newtype (unwrap, wrap)
import Data.Number as Number
import Data.String as String
import Data.String.NonEmpty (NonEmptyString)
import Data.String.NonEmpty as NES
import Data.String.NonEmpty as NonEmptyString
import Data.Time.Duration (Seconds, convertDuration)
import Data.Username (Username)

newtype Message = Message
  { message ∷ NonEmptyString
  , createdAt ∷ DateTime
  , username ∷ Username
  }

derive newtype instance Show Message
derive newtype instance Eq Message

instance EncodeJson Message where
  encodeJson (Message m) = encodeJson
    { message: m.message
    , created_at:
        Number.round
          $ (unwrap ∷ Seconds → _)
          $ convertDuration
          $ Instant.unInstant
          $ Instant.fromDateTime m.createdAt
    , username: m.username
    }

instance DecodeJson Message where
  decodeJson json = do
    { message, created_at, username }
      ∷ { message ∷ String, created_at ∷ Number, username ∷ Username } ←
      decodeJson json
    posix ← note (TypeMismatch "Unexpected Milliseconds value")
      $ Instant.instant
      $ (convertDuration ∷ Seconds → _)
      $ wrap created_at
    text ← note (TypeMismatch "The `message` value is empty")
      $ NES.fromString message
    pure $ Message { createdAt: toDateTime posix, message: text, username }

toString ∷ Message → String
toString (Message m) = NonEmptyString.toString m.message

parse ∷ String → Either (NonEmptyArray String) NonEmptyString
parse s = NES.fromString (String.trim s) # maybe
  (Left $ pure "Your message is empty!")
  \str →
    if NES.length str > 800 then Left $ pure "Your message is too long!"
    else Right str
