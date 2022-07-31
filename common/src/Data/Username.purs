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
import Data.Argonaut.Decode (class DecodeJson)
import Data.Argonaut.Encode (class EncodeJson)
import Data.Array (any, (:))
import Data.Array.NonEmpty as NEA
import Data.Array.NonEmpty.Internal (NonEmptyArray)
import Data.Bifunctor (lmap)
import Data.Char.Gen (genAlpha, genDigitChar)
import Data.CodePoint.Unicode as Unicode
import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut as CA
import Data.Either (Either(..), isRight)
import Data.Profunctor (dimap)
import Data.String (null, trim) as String
import Data.String.CodePoints (codePointFromChar, length, toCodePointArray) as String
import Data.String.Gen (genString)
import Data.Tuple (Tuple(..))
import Foreign (ForeignError(..))
import Foreign.Generic.Class (class Decode, class Encode, decode)
import Test.QuickCheck.Arbitrary (class Arbitrary)
import Test.QuickCheck.Gen (Gen, frequency)

newtype Username = Username String

derive newtype instance Eq Username
derive newtype instance Ord Username
derive newtype instance Encode Username
derive newtype instance EncodeJson Username
derive newtype instance DecodeJson Username

instance Decode Username where
  decode f = decode f >>=
    parse
      >>> lmap (NEA.toUnfoldable1 >>> map ForeignError)
      >>> except

instance Show Username where
  show username = "(Username " <> toString username <> ")"

instance Arbitrary Username where
  arbitrary ∷ Gen Username
  arbitrary = Username <$> genString usernameChar
    where
    usernameChar ∷ Gen Char
    usernameChar = frequency
      $ NEA.cons' (Tuple 5.0 genAlpha)
      $ Tuple 3.0 genDigitChar
          : Tuple 1.0 (pure '_')
          : Tuple 1.0 (pure '-')
          : mempty

codec ∷ JsonCodec Username
codec = dimap toString Username CA.string

parse ∷ String → Either (NonEmptyArray String) Username
parse s = case String.trim s of
  str | String.null str → Left (pure "Username can't be empty")
  str | any (not <<< isValidCodePoint) (String.toCodePointArray str) →
    Left (pure "Username must contain only alphanumeric characters, _ and -")
  str | String.length str > 20 →
    Left (pure "Username mustn't be longer than 20 characters")
  str → Right (Username str)
  where
  isValidCodePoint cp =
    Unicode.isAlphaNum cp
      || cp == String.codePointFromChar '_'
      || cp == String.codePointFromChar '-'
      || cp == String.codePointFromChar '.'

isValid ∷ String → Boolean
isValid = isRight <<< parse

toString ∷ Username → String
toString (Username name) = name

unsafe ∷ String → Username
unsafe = Username
