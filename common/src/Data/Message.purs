module Data.Message
  ( toString
  , parse
  , Message
  , unsafe
  ) where

import Preamble

import Data.Array.NonEmpty (NonEmptyArray)
import Data.String as String

newtype Message = Message String

toString ∷ Message → String
toString (Message str) = str

parse ∷ String → Either (NonEmptyArray String) Message
parse = case _ of
  s | String.length s > 200 → Left $ pure
    "Message can not be longer than 200 characters"
  s → Right $ Message s

unsafe ∷ String → Message
unsafe = Message
