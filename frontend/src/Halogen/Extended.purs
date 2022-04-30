module Halogen.Extended
  ( module H
  , OpaqueSlot
  , raiseErrors
  , raiseErrors_
  , raiseError
  , raiseError_
  ) where

import Prelude

import Control.Monad.Except (ExceptT, runExceptT)
import Data.Either (Either(..))
import Halogen
  ( AttrName(..)
  , ClassName(..)
  , Component
  , ComponentHTML
  , ComponentSlot
  , ComponentSlotSpec
  , ComponentSpec
  , ElemName(..)
  , ForkId
  , HalogenF(..)
  , HalogenIO
  , HalogenM(..)
  , HalogenQ(..)
  , Namespace(..)
  , PropName(..)
  , RefLabel(..)
  , Request
  , Slot
  , SubscriptionId
  , Tell
  , componentSlot
  , defaultEval
  , defer
  , fork
  , get
  , getHTMLElementRef
  , getRef
  , gets
  , hoist
  , kill
  , lift
  , liftAff
  , liftEffect
  , mkComponent
  , mkEval
  , mkRequest
  , mkTell
  , modify
  , modify_
  , put
  , query
  , queryAll
  , raise
  , request
  , requestAll
  , subscribe
  , subscribe'
  , tell
  , unComponent
  , unComponentSlot
  , unsubscribe
  ) as H

-- | When a component has no queries or messages, it has no public interface and can be
-- | considered an "opaque" component. The only way for a parent to interact with the
-- | component is by sending input.
type OpaqueSlot slot = ∀ query. H.Slot query Void slot

raiseErrors
  ∷ ∀ m e e' r s a l
  . ExceptT e (H.HalogenM s a l e' m) r
  → (e → e')
  → (r → H.HalogenM s a l e' m Unit)
  → H.HalogenM s a l e' m Unit
raiseErrors et f k = do
  runExceptT et >>=
    case _ of
      Left e → H.raise (f e)
      Right a → k a

raiseError
  ∷ ∀ m e r s a l
  . ExceptT e (H.HalogenM s a l e m) r
  → (r → H.HalogenM s a l e m Unit)
  → H.HalogenM s a l e m Unit
raiseError et = raiseErrors et identity

raiseErrors_
  ∷ ∀ s a l e e' m
  . ExceptT e (H.HalogenM s a l e' m) Unit
  → (e → e')
  → H.HalogenM s a l e' m Unit
raiseErrors_ e f = raiseErrors e f pure

raiseError_
  ∷ ∀ s a l e m
  . ExceptT e (H.HalogenM s a l e m) Unit
  → H.HalogenM s a l e m Unit
raiseError_ e = raiseErrors_ e identity
