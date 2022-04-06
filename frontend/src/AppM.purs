module AppM where

import Prelude

import Backend as Backend
import Config (Config)
import Control.Monad.Error.Class (class MonadThrow, throwError)
import Control.Monad.Except (ExceptT, runExceptT, throwError)
import Control.Monad.Reader (class MonadAsk, ReaderT, runReaderT)
import Control.Monad.Reader.Class (ask)
import Control.Monad.Trans.Class (class MonadTrans, lift)
import Data.Either (Either(..))
import Data.Newtype (class Newtype, unwrap)
import Effect.Aff (Aff)
import Effect.Aff.Class (class MonadAff, liftAff)
import Effect.Class (class MonadEffect, liftEffect)

newtype AppM c a = AppM (ExceptT Backend.Error (ReaderT c Aff) a)

derive instance Newtype (AppM c a) _
derive newtype instance Functor (AppM c)
derive newtype instance Apply (AppM c)
derive newtype instance Applicative (AppM c)
derive newtype instance Bind (AppM c)
derive newtype instance Monad (AppM c)
derive newtype instance MonadAsk c (AppM c)
derive newtype instance MonadEffect (AppM c)
derive newtype instance MonadAff (AppM c)
derive newtype instance MonadThrow Backend.Error (AppM c)

type App = AppM Config

run ∷ Config → App ~> Aff
run c m = runReaderT (runExceptT $ unwrap m) c >>= case _ of
  Right a → pure a
  Left _err → throwError ?x

config ∷ ∀ c. AppM c c
config = ask
