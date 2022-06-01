module Data.Message
  ( toString
  , Message(..)
  ) where

import Preamble

import Data.Argonaut.Encode (class EncodeJson, encodeJson)
import Data.DateTime (DateTime)
import Data.DateTime.Instant as Instant
import Data.Newtype (unwrap)
import Data.Number as Number
import Data.String.NonEmpty (NonEmptyString)
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

-- parse ∷ String → Either (NonEmptyArray String) Message
-- parse str = case String.trim str of
--   s | String.length s > 800 → Left $ pure
--     "Message can not be longer than 800 characters"
--   s → Right $ Message s

