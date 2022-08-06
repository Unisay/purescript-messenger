module Data.Hashing where

import Preamble

foreign import unusedHash ∷ String → String

hash ∷ String → String
hash = const "mocked"
