module Data.Email
  ( parse
  , Email
  , codec
  ) where

import Prelude

import Data.Argonaut.Encode (class EncodeJson)
import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut as CA
import Data.Either (Either(..))
import Data.Profunctor (dimap)
import Foreign.Generic (class Decode)
import Text.Email.Parser as EmailParse
import Text.Email.Validate (validate)

newtype Email = Email String

derive newtype instance Eq Email
derive newtype instance Ord Email
derive newtype instance EncodeJson Email
derive newtype instance Decode Email
instance Show Email where
  show (Email s) = show s

codec :: JsonCodec Email
codec = dimap toString Email CA.string

toString :: Email -> String
toString (Email s) = s

parse ∷ String → Either String Email
parse s = case validate s of
  Left er -> Left er
  Right ea -> Right $ toEmail ea
  where
  toEmail = Email <<< EmailParse.toString

-- parse :: String -> Either String Email
-- parse str = case toLower $ remSpaces str of
--   "" -> Left "Email can't be empty"
--   s | (length $ remSpaces s) > 320 -> Left "Email adress is too long!"
--   s | Array.any (not <<< isValidCodePoint) (String.toCodePointArray s) ->
--     Left "Email contains invalid characters!"
--   s | takeCodepoint Array.head s || takeCodepoint Array.last s ->
--     Left "Invalid email adress!"
--   s
--     | let
--         l = Array.length $ String.split (Pattern "@") s
--       in
--         not $ l == 2 -> Left "Invalid email adress!"
--   s | String.contains (Pattern "@.") s || String.contains (Pattern ".@") s ->
--     Left "Invalid email adress!"
--   s
--     | let
--         ad = fromMaybe "" $ Array.last $ String.split (Pattern "@") s
--       in
--         (not <<< String.contains $ Pattern ".") ad ->
--         Left "Invalid email adress!"
--   s
--     | let
--         cs = toCharArray s
--       in
--         Array.any (_ == '@') cs
--           && Array.any (_ == '.') cs ->
--         (Right <<< Email) s
--   _ -> Left "Invalid email adress"
--   where
--   remSpaces = fold <<< String.split (Pattern " ") <<< String.trim
--   isValidCodePoint cp =
--     Unicode.isLatin1 cp
--       &&
--         ( Unicode.isAlphaNum cp
--             || cp == String.codePointFromChar '@'
--             || cp == String.codePointFromChar '.'
--             || cp == String.codePointFromChar '-'
--         )
--   takeCodepoint f = not
--     <<< Unicode.isAlphaNum
--     <<< fromMaybe (String.codePointFromChar '&')
--     <<< f
--     <<< toCodePointArray

