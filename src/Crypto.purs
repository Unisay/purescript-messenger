module Crypto
  ( Digest
  , Algorithm
  , SHA256
  , SHA512
  , sha256hex
  , unsafeSha256
  , sha512hex
  ) where

import Preamble

import Control.Promise (Promise, toAffE)
import Data.Argonaut.Decode (class DecodeJson)
import Data.Argonaut.Encode (class EncodeJson)
import Effect.Aff (Aff)

data Algorithm -- Kind

foreign import data SHA256 ∷ Algorithm
foreign import data SHA512 ∷ Algorithm

newtype Digest ∷ Algorithm → Type
newtype Digest alg = Digest String

instance Show (Digest SHA256) where
  show (Digest hex) = hex

derive newtype instance Eq (Digest alg)
derive newtype instance EncodeJson (Digest alg)
derive newtype instance DecodeJson (Digest alg)

sha256hex ∷ String → Aff (Digest SHA256)
sha256hex = map Digest <<< toAffE <<< _sha "SHA-256"

unsafeSha256 ∷ String → Digest SHA256
unsafeSha256 = Digest

sha512hex ∷ String → Aff (Digest SHA512)
sha512hex = map Digest <<< toAffE <<< _sha "SHA-512"

foreign import _sha ∷ String → String → Effect (Promise String)
