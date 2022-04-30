module AppM where

import Preamble

import Backend as Backend
import Config (Config)
import Control.Monad.Reader (class MonadAsk, ReaderT, runReaderT)
import Control.Monad.Reader.Class (ask)
import Data.Newtype (class Newtype)
import Effect.Aff (Aff)
import Effect.Aff.Class (class MonadAff)
import Effect.Class (class MonadEffect)

newtype Error = BackendError Backend.Error

derive newtype instance Show Error

newtype AppM c a = AppM ((ReaderT c Aff) a)

derive instance Newtype (AppM c a) _
derive newtype instance Functor (AppM c)
derive newtype instance Apply (AppM c)
derive newtype instance Applicative (AppM c)
derive newtype instance Bind (AppM c)
derive newtype instance Monad (AppM c)
derive newtype instance MonadAsk c (AppM c)
derive newtype instance MonadEffect (AppM c)
derive newtype instance MonadAff (AppM c)

type App = AppM Config

run ∷ ∀ c. c → AppM c ~> Aff
run c (AppM m) = runReaderT m c

config ∷ ∀ c. AppM c c
config = ask

