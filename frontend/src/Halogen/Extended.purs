module Halogen.Extended
  ( module H
  , OpaqueSlot
  ) where

import Data.Void (Void)
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
type OpaqueSlot slot = forall query. H.Slot query Void slot
