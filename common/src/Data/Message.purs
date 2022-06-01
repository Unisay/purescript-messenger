module Data.Message
  ( toString
  , Message(..)
  , parse
  ) where

import Preamble

import Data.Argonaut.Encode (class EncodeJson, encodeJson)
import Data.Array.NonEmpty (NonEmptyArray)
import Data.DateTime (DateTime)
import Data.DateTime.Instant as Instant
import Data.Newtype (unwrap)
import Data.Number as Number
import Data.String as String
import Data.String.NonEmpty (NonEmptyString)
import Data.String.NonEmpty as NES
import Data.String.NonEmpty as NonEmptyString
import Data.Time.Duration (Seconds, convertDuration)

newtype Message = Message
  { text ∷ NonEmptyString
  , createdAt ∷ DateTime
  }

instance EncodeJson Message where
  encodeJson (Message m) = encodeJson
    { text: m.text
    , created_at:
        Number.round
          $ (unwrap ∷ Seconds → _)
          $ convertDuration
          $ Instant.unInstant
          $ Instant.fromDateTime m.createdAt
    }

toString ∷ Message → String
toString (Message m) = NonEmptyString.toString m.text

parse ∷ String → Either (NonEmptyArray String) NonEmptyString
parse s = NES.fromString (String.trim s) # maybe
  (Left $ pure "Your message is empty!")
  \str →
    if NES.length str > 800 then Left $ pure "Your message is too long!"
    else Right str
