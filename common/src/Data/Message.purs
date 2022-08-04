module Data.Message
  ( toString
  , Message(..)
  , parse
  , fromCursored
  , WithCursor(..)
  , Cursor
  , CursoredMessages
  , dateTimeToSeconds
  , hash
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

type Cursor = Maybe String

data WithCursor a = WithCursor Cursor a

newtype Message = Message
  { text ∷ NonEmptyString
  , createdAt ∷ DateTime
  , username ∷ Username
  }

type CursoredMessages = WithCursor (Array Message)

derive newtype instance Show Message
derive newtype instance Eq Message

instance EncodeJson Message where
  encodeJson (Message m) = encodeJson
    { text: m.text
    , created_at: dateTimeToSeconds m.createdAt
    , username: m.username
    , hash: hash $ show m.username <> show m.text <> show m.createdAt
    }

instance DecodeJson Message where
  decodeJson json = do
    m ∷ { text ∷ String, created_at ∷ Number, username ∷ Username } ←
      decodeJson json
    posix ← note (TypeMismatch "Unexpected Milliseconds value")
      $ Instant.instant
      $ (convertDuration ∷ Seconds → _)
      $ wrap m.created_at
    text ← note (TypeMismatch "The `message` value is empty")
      $ NES.fromString m.text
    pure $ Message
      { createdAt: toDateTime posix, text, username: m.username }

instance DecodeJson CursoredMessages where
  decodeJson json = do
    m ∷ { cursor ∷ Cursor, items ∷ Array Message } ← decodeJson json
    pure $ WithCursor m.cursor m.items

toString ∷ Message → String
toString (Message m) = NonEmptyString.toString m.text

parse ∷ String → Either (NonEmptyArray String) NonEmptyString
parse s = NES.fromString (String.trim s) # maybe
  (Left $ pure "Your message is empty!")
  \str →
    if NES.length str > 800 then Left $ pure "Your message is too long!"
    else Right str

fromCursored ∷ CursoredMessages → Array Message
fromCursored (WithCursor _ arr) = arr

dateTimeToSeconds ∷ DateTime → Number
dateTimeToSeconds = Instant.fromDateTime
  >>> Instant.unInstant
  >>> convertDuration
  >>> (unwrap ∷ Seconds → _)
  >>> Number.round

foreign import hash ∷ String → String
