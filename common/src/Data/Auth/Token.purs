module Data.Auth.Token where

import Data.Argonaut.Encode (class EncodeJson)
import Data.Argonaut.Decode (class DecodeJson)
import Data.Newtype (class Newtype)

newtype Token = Token String

derive instance Newtype Token _
derive newtype instance EncodeJson Token
derive newtype instance DecodeJson Token
