module Data.Email
  ( parse
  , toString
  , Email
  , codec
  ) where

import Prelude

import Data.Argonaut.Encode (class EncodeJson)
import Data.Array (any)
import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut as CA
import Data.Either (Either(..))
import Data.Profunctor (dimap)
import Data.String.CodeUnits (toCharArray)
import Data.String.Common (toLower)
import Foreign.Generic (class Decode)

newtype Email = Email String

derive newtype instance Eq Email
derive newtype instance Ord Email
derive newtype instance EncodeJson Email
derive newtype instance Decode Email

toString :: Email -> String
toString (Email s) = s

codec :: JsonCodec Email
codec = dimap toString Email CA.string

parse :: String -> Either String Email
parse = case _ of
  "" -> Left "Email can't be empty"
  s | any (_ == '@') (toCharArray s) && any (_ == '.') (toCharArray s) ->
    Right (Email $ toLower s)
  _ -> Left "Invalid email adress"
