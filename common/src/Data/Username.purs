module Data.Username
  ( Username -- constructor not exported
  , parse
  , toString
  , codec
  , isValid
  , unsafe
  ) where

import Prelude

import Control.Monad.Except.Trans (except)
import Data.Argonaut.Encode (class EncodeJson)
import Data.Array (any)
import Data.Array.NonEmpty as NEA
import Data.Array.NonEmpty.Internal (NonEmptyArray)
import Data.Bifunctor (lmap)
import Data.CodePoint.Unicode as Unicode
import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut as CA
import Data.Either (Either(..), isRight)
import Data.Profunctor (dimap)
import Data.String (null, trim) as String
import Data.String.CodePoints (codePointFromChar, toCodePointArray) as String
import Foreign (ForeignError(..))
import Foreign.Generic.Class (class Encode, class Decode, decode)

newtype Username = Username String

derive newtype instance Eq Username
derive newtype instance Ord Username
derive newtype instance Encode Username
derive newtype instance EncodeJson Username

instance Decode Username where
  decode f = decode f >>=
    parse
      >>> lmap (NEA.toUnfoldable1 >>> map ForeignError)
      >>> except

instance Show Username where
  show username = "(Username " <> toString username <> ")"

codec :: JsonCodec Username
codec = dimap toString Username CA.string

parse :: String -> Either (NonEmptyArray String) Username
parse s = case String.trim s of
  str | String.null str -> Left (pure "Username can't be empty")
  str | any (not <<< isValidCodePoint) (String.toCodePointArray str) ->
    Left (pure "Username must contain only alphanumeric characters, _ and -")
  str -> Right (Username str)
  where
  isValidCodePoint cp =
    Unicode.isAlphaNum cp
      || cp == String.codePointFromChar '_'
      || cp == String.codePointFromChar '-'

isValid :: String -> Boolean
isValid = isRight <<< parse

toString :: Username -> String
toString (Username name) = name

unsafe :: String -> Username
unsafe = Username
