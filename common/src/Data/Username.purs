module Data.Username
  ( Username -- constructor not exported
  , parse
  , toString
  , codec
  , isValid
  ) where

import Prelude
import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut as CA
import Data.Argonaut.Encode (class EncodeJson)
import Data.Maybe (Maybe(..))
import Data.Either (note)
import Data.Profunctor (dimap)
import Foreign.Generic.Class (class Encode, class Decode, decode)
import Control.Monad.Except.Trans (except)
import Foreign (ForeignError(..))
import Data.String (null, trim) as String
import Data.String.CodePoints (codePointFromChar, toCodePointArray) as String
import Data.CodePoint.Unicode as Unicode
import Data.Array (all)

newtype Username = Username String

derive newtype instance Eq Username
derive newtype instance Ord Username
derive newtype instance Encode Username
derive newtype instance EncodeJson Username

instance Decode Username where
  decode f = do
    s <- decode f
    except $ note (pure (ForeignError "Invalid Username")) (parse s)

instance Show Username where
  show username = "(Username " <> toString username <> ")"

codec :: JsonCodec Username
codec = dimap toString Username CA.string

parse :: String -> Maybe Username
parse s = case String.trim s of
  str | isValid str -> Just (Username str)
  _ -> Nothing

isValid :: String -> Boolean
isValid s =
  not (String.null s) && all isValidCodePoint (String.toCodePointArray s)
  where
  isValidCodePoint cp =
    Unicode.isAlphaNum cp
      || cp == String.codePointFromChar '_'
      || cp == String.codePointFromChar '-'

toString :: Username -> String
toString (Username str) = str

