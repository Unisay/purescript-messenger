module Data.Password
  ( Password
  , parse
  , codec
  , toString
  ) where

import Prelude
import Data.Maybe (Maybe(..))
import Foreign.Class (class Decode)
import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut as CA
import Data.Profunctor (dimap)
import Data.Argonaut.Encode (class EncodeJson)

newtype Password = Password String

derive newtype instance Eq Password
derive newtype instance Ord Password
derive newtype instance EncodeJson Password

codec :: JsonCodec Password
codec = dimap toString Password CA.string

parse :: String -> Maybe Password
parse = case _ of
  "" -> Nothing
  s -> Just (Password s)

toString :: Password -> String
toString (Password s) = s

derive newtype instance Decode Password
