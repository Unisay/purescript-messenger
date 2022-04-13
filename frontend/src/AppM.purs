module AppM where

import Prelude

import Control.Monad.Reader (class MonadAsk, ReaderT, runReaderT)
import Control.Monad.Reader.Class (ask)
import Data.Newtype (class Newtype, unwrap)
import Effect.Aff (Aff)
import Effect.Aff.Class (class MonadAff)
import Effect.Class (class MonadEffect)

newtype AppM c a = AppM (ReaderT c Aff a)

derive instance Newtype (AppM c a) _
derive newtype instance Functor (AppM c)
derive newtype instance Apply (AppM c)
derive newtype instance Applicative (AppM c)
derive newtype instance Bind (AppM c)
derive newtype instance Monad (AppM c)
derive newtype instance MonadAsk c (AppM c)
derive newtype instance MonadEffect (AppM c)
derive newtype instance MonadAff (AppM c)

run ∷ ∀ c. c → AppM c ~> Aff
run c m = runReaderT (unwrap m) c

config ∷ ∀ c. AppM c c
config = ask
