module Data.Password
  ( Password
  , parse
  , codec
  , toString
  ) where

import Prelude

import Data.Argonaut.Encode (class EncodeJson)
import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut as CA
import Data.Either (Either(..))
import Data.String.CodePoints as String
import Data.Profunctor (dimap)
import Foreign.Class (class Decode)

newtype Password = Password String

derive newtype instance Eq Password
derive newtype instance Ord Password
derive newtype instance EncodeJson Password

codec :: JsonCodec Password
codec = dimap toString Password CA.string

parse :: String -> Either String Password
parse = case _ of
  "" -> Left "Password is empty"
  s | String.length s < 8 -> Left "Password must be at least 8 characters long"
  s -> Right (Password s)

toString :: Password -> String
toString (Password s) = s

derive newtype instance Decode Password
