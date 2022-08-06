module Data.Validation (Validation) where

import Preamble

import Data.Array.NonEmpty (NonEmptyArray)

type Validation a =
  { inputValue ∷ String
  , result ∷ Maybe (Either (NonEmptyArray String) a)
  }
