module Preamble
  ( module Prelude
  , module Data.Maybe
  , module Data.Either
  , module Effect
  , module Effect.Class.Console
  , module Effect.Class
  , pass
  ) where

import Prelude

import Data.Either (Either(..), either, hush, note)
import Data.Maybe (Maybe(..), fromJust, fromMaybe, isJust, isNothing, maybe)
import Effect (Effect)
import Effect.Class (class MonadEffect, liftEffect)
import Effect.Class.Console (log, logShow)

pass ∷ ∀ t. Applicative t ⇒ t Unit
pass = pure unit
