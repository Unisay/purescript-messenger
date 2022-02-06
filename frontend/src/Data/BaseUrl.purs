module Data.BaseUrl (BaseUrl, toString, parse, codec) where

import Prelude

import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut as CA
import Data.Maybe (Maybe(..))
import Data.Profunctor (dimap)

newtype BaseUrl
  = BaseUrl String

derive instance eqBaseUrl ∷ Eq BaseUrl

codec ∷ JsonCodec BaseUrl
codec = dimap toString BaseUrl CA.string

parse ∷ String → Maybe BaseUrl
parse = case _ of
  "" → Nothing
  str → Just (BaseUrl str)

toString ∷ BaseUrl → String
toString (BaseUrl str) = str
