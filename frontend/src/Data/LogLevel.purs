module Data.LogLevel where

import Preamble

data LogLevel
  = Dev
  | Prod

derive instance eqLogLevel ∷ Eq LogLevel

derive instance ordLogLevel ∷ Ord LogLevel
