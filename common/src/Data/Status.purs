module Data.Status
  ( Status(..)
  , toString
  , parse
  ) where

import Prelude

import Data.Argonaut.Decode (class DecodeJson, JsonDecodeError(..), decodeJson)
import Data.Argonaut.Encode (class EncodeJson, encodeJson)
import Data.Bifunctor (lmap)
import Data.Either (Either(..))
import Data.String (toLower, trim)

data Status = Online | Away

derive instance Eq Status
derive instance Ord Status

toString :: Status -> String
toString Online = "online"
toString Away = "away"

parse :: String -> Either String Status
parse str = case trim $ toLower str of
  "" -> Left "Expected status, got: empty string"
  "online" -> Right Online
  "away" -> Right Away
  s -> Left $ "Expected status, got: " <> s

instance EncodeJson Status where
  encodeJson = toString >>> encodeJson

instance DecodeJson Status where
  decodeJson j = decodeJson j >>= \s ->
    lmap
      (\_ -> TypeMismatch $ "Expected online/away, but got" <> s) $ parse s