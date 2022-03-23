module Data.Validation (Validation) where

import Data.Array.NonEmpty (NonEmptyArray)
import Data.Either (Either)
import Data.Maybe (Maybe)

type Validation a =
  { inputValue ∷ String
  , result ∷ Maybe (Either (NonEmptyArray String) a)
  }