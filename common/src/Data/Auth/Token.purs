module Data.Auth.Token
  ( Token
  , parse
  , toString
  ) where

import Prelude

import Data.Argonaut.Decode (class DecodeJson, decodeJson)
import Data.Argonaut.Encode (class EncodeJson)
import Data.Either (Either(..))
import Data.String as String
import Data.String.NonEmpty as NES

newtype Token = Token String

derive newtype instance EncodeJson Token
instance DecodeJson Token where
  decodeJson = decodeJson >>> map (NES.toString >>> Token)

parse :: String -> Either String Token
parse str = case String.trim str of
  "" -> Left "Token is empty"
  _ -> Right (Token str)

toString :: Token -> String
toString (Token str) = str