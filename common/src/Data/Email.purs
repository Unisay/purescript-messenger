module Data.Email
  ( Email
  , parse
  , codec
  , toString
  , unsafe
  ) where

import Prelude

import Data.Argonaut.Decode (class DecodeJson)
import Data.Argonaut.Encode (class EncodeJson)
import Data.Bifunctor (bimap)
import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut as CA
import Data.Either (Either)
import Data.Profunctor (dimap)
import Foreign.Generic (class Decode, class Encode)
import Text.Email.Parser as EP
import Text.Email.Validate as EV

newtype Email = Email String

derive newtype instance Eq Email
derive newtype instance Ord Email
derive newtype instance EncodeJson Email
derive newtype instance DecodeJson Email
derive newtype instance Decode Email
derive newtype instance Encode Email

instance Show Email where
  show (Email s) = show s

codec ∷ JsonCodec Email
codec = dimap toString Email CA.string

toString ∷ Email → String
toString (Email s) = s

parse ∷ String → Either String Email
parse = bimap showEmailParsingErr (Email <<< EP.toString) <<< EV.runEmailParser
  where
  showEmailParsingErr { error, pos } = error <> " at position " <> show pos

unsafe ∷ String → Email
unsafe = Email
