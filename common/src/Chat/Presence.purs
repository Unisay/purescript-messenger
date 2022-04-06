module Chat.Presence where

import Prelude

import Control.Monad.Except (except)
import Data.Argonaut.Decode (class DecodeJson, JsonDecodeError(..), decodeJson)
import Data.Argonaut.Encode (class EncodeJson, encodeJson)
import Data.Either (note)
import Data.Maybe (Maybe(..))
import Foreign (ForeignError(..), readString)
import Foreign.Generic (class Decode)
import Foreign.Generic as Foreign

data Presence = Online | Away | Offline

derive instance Eq Presence
derive instance Ord Presence

instance Show Presence where
  show = case _ of
    Online -> "Online"
    Away -> "Away"
    Offline -> "Offline"

instance Foreign.Encode Presence where
  encode = Foreign.encode <<< show

instance EncodeJson Presence where
  encodeJson = encodeJson <<< show

instance DecodeJson Presence where
  decodeJson j = decodeJson j >>= parse >>> note (UnexpectedValue j)

instance Decode Presence where
  decode foreignPresence = do
    s <- readString foreignPresence
    except $ note (pure $ ForeignError s) (parse s)

parse :: String -> Maybe Presence
parse = case _ of
  "Online" -> Just Online
  "Away" -> Just Away
  "Offline" -> Just Offline
  _ -> Nothing

