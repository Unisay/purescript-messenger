module Data.Email
  ( parse
  , toString
  , Email
  , codec
  ) where

import Prelude

import Data.Argonaut.Encode (class EncodeJson)
import Data.Array as Array
import Data.CodePoint.Unicode as Unicode
import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut as CA
import Data.Either (Either(..))
import Data.Foldable (fold)
import Data.Maybe (fromMaybe)
import Data.Profunctor (dimap)
import Data.String (Pattern(..), toCodePointArray)
import Data.String as String
import Data.String.CodeUnits (length, toCharArray)
import Data.String.Common (toLower)
import Data.String.Utils (includes)
import Foreign.Generic (class Decode)

newtype Email = Email String

derive newtype instance Eq Email
derive newtype instance Ord Email
derive newtype instance EncodeJson Email
derive newtype instance Decode Email
instance Show Email where
  show (Email s) = show s

toString :: Email -> String
toString (Email s) = s

codec :: JsonCodec Email
codec = dimap toString Email CA.string

parse :: String -> Either String Email
parse str = case remSpaces str of
  "" -> Left "Email can't be empty"
  s | (length $ remSpaces s) > 320 -> Left "Email adress is too long!"
  s | Array.any (not <<< isValidCodePoint) (String.toCodePointArray s) ->
    Left "Email contains invalid characters!"
  s | takeCodepoint Array.head s || takeCodepoint Array.last s ->
    Left "Invalid email adress!"
  s
    | let
        l = Array.length $ String.split (Pattern "@") s
      in
        not $ l == 2 -> Left "Invalid email adress!"
  s | includes "@." s || includes ".@" s -> Left "Invalid email adress!"
  s
    | let
        cs = toCharArray s
      in
        Array.any (_ == '@') cs
          && Array.any (_ == '.') cs ->
        (Right <<< Email <<< toLower) s
  _ -> Left "Invalid email adress"
  where
  remSpaces = fold <<< String.split (Pattern " ") <<< String.trim
  isValidCodePoint cp =
    Unicode.isLatin1 cp
      &&
        ( Unicode.isAlphaNum cp
            || cp == String.codePointFromChar '@'
            || cp == String.codePointFromChar '.'
        )
  takeCodepoint f = not
    <<< Unicode.isAlphaNum
    <<< fromMaybe (String.codePointFromChar '&')
    <<< f
    <<< toCodePointArray
    
