module Preamble
  ( module Prelude
  , module Data.Maybe
  , module Data.Either
  , module Effect
  , module Effect.Class.Console
  ) where

import Prelude

import Data.Maybe (Maybe(..), fromJust, fromMaybe, isJust, isNothing, maybe)
import Data.Either (Either(..), either, hush, note)
import Effect (Effect)
import Effect.Class.Console (log, logShow)
