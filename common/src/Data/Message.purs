module Data.Message
  ( toString
  , parse
  , Message
  , unsafe
  ) where

import Preamble

import Data.Argonaut.Encode (class EncodeJson)
import Data.Array.NonEmpty (NonEmptyArray)
import Data.String as String

newtype Message = Message String

derive newtype instance EncodeJson Message

toString ∷ Message → String
toString (Message str) = str

parse ∷ String → Either (NonEmptyArray String) Message
parse str = case String.trim str of
  s | String.length s > 800 → Left $ pure
    "Message can not be longer than 800 characters"
  s → Right $ Message s

unsafe ∷ String → Message
unsafe = Message
