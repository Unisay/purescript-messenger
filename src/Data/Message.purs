module Data.Message
  ( toString
  , Message(..)
  , renderId
  , parse
  , create
  , SlidingWindow
  , Cursor
  , dateTimeToSeconds
  ) where

import Preamble

import Crypto (Digest, SHA256, sha256hex)
import Data.Argonaut.Decode (class DecodeJson, JsonDecodeError(..), decodeJson)
import Data.Argonaut.Encode (class EncodeJson, encodeJson)
import Data.Array.NonEmpty (NonEmptyArray)
import Data.DateTime (DateTime)
import Data.DateTime.Instant (Instant, toDateTime)
import Data.DateTime.Instant as Instant
import Data.Newtype (unwrap, wrap)
import Data.Number as Number
import Data.String as String
import Data.String.NonEmpty (NonEmptyString)
import Data.String.NonEmpty as NES
import Data.String.NonEmpty as NonEmptyString
import Data.Time.Duration (Seconds, convertDuration)
import Data.Username (Username)
import Effect.Aff (Aff)
import Effect.Now (nowDateTime)
import Foreign (Foreign)

type Cursor = String

type SlidingWindow ∷ Type → Type
type SlidingWindow item =
  { fromCursor ∷ Cursor
  , toCursor ∷ Cursor
  , items ∷ Array item
  }

newtype Message = Message
  { id ∷ Digest SHA256
  , text ∷ NonEmptyString
  , createdAt ∷ DateTime
  , author ∷ Username
  }

create ∷ NonEmptyString → Username → Aff Message
create text author = do
  createdAt ← liftEffect nowDateTime
  id ← sha256hex $ show author <> show text <> show createdAt
  pure $ Message { id, text, author, createdAt }

derive newtype instance Show Message
derive newtype instance Eq Message

instance EncodeJson Message where
  encodeJson (Message m) = encodeJson
    { text: m.text
    , created_at: dateTimeToSeconds m.createdAt
    , author: m.author
    , id: m.id
    }

instance DecodeJson Message where
  decodeJson json = do
    m
      ∷ { id ∷ Digest SHA256
        , text ∷ String
        , created_at ∷ Number
        , author ∷ Username
        } ←
      decodeJson json
    posix ← note (TypeMismatch "Unexpected Milliseconds value")
      $ numberToPosix m.created_at
    text ← note (TypeMismatch "The `message` value is empty")
      $ NES.fromString m.text
    pure $ Message
      { id: m.id, createdAt: toDateTime posix, text, author: m.author }

toString ∷ Message → String
toString (Message m) = NonEmptyString.toString m.text

renderId ∷ Message → String
renderId (Message m) = show m.id

parse ∷ String → Either (NonEmptyArray String) NonEmptyString
parse s = NES.fromString (String.trim s) # maybe
  (Left $ pure "Your message is empty!")
  \str →
    if NES.length str > 800 then Left $ pure "Your message is too long!"
    else Right str

dateTimeToSeconds ∷ DateTime → Number
dateTimeToSeconds = Instant.fromDateTime
  >>> Instant.unInstant
  >>> convertDuration
  >>> (unwrap ∷ Seconds → _)
  >>> Number.round

numberToPosix ∷ Number → Maybe Instant
numberToPosix = wrap
  >>> (convertDuration ∷ Seconds → _)
  >>> Instant.instant
