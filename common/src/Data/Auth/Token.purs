module Data.Auth.Token
  ( Token
  , parse
  , toString
  , unsafe
  , JsonToken
  ) where

import Prelude

import Data.Argonaut.Decode (class DecodeJson, decodeJson)
import Data.Argonaut.Encode (class EncodeJson)
import Data.Either (Either(..))
import Data.String as String

newtype Token = Token String

type JsonToken =
  { protected ∷ String
  , payload ∷ String
  , signature ∷ String
  }

derive newtype instance Eq Token
derive newtype instance EncodeJson Token

instance DecodeJson Token where
  decodeJson = decodeJson >>> map fromJsonToken
    where
    fromJsonToken ∷ JsonToken → Token
    fromJsonToken t = Token $ t.protected
      <> "."
      <> t.payload
      <> "."
      <> t.signature

parse ∷ String → Either String Token
parse str = case String.trim str of
  "" → Left "Token is empty"
  _ → Right (Token str)

toString ∷ Token → String
toString (Token str) = str

unsafe ∷ String → Token
unsafe = Token
