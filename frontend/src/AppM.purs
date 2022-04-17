module AppM where

import Prelude

import Backend as Backend
import Config (Config)
import Control.Monad.Error.Class (class MonadError, class MonadThrow)
import Control.Monad.Except (ExceptT, runExceptT, throwError, withExceptT)
import Control.Monad.Reader (class MonadAsk, ReaderT, runReaderT)
import Control.Monad.Reader.Class (ask)
import Data.Either (Either(..))
import Data.Newtype (class Newtype, over, unwrap)
import Effect.Aff (Aff, error)
import Effect.Aff.Class (class MonadAff)
import Effect.Class (class MonadEffect)

newtype Error = BackendError Backend.Error

newtype AppM e c a = AppM (ExceptT e (ReaderT c Aff) a)

derive instance Newtype (AppM e c a) _
derive newtype instance Functor (AppM e c)
derive newtype instance Apply (AppM e c)
derive newtype instance Applicative (AppM e c)
derive newtype instance Bind (AppM e c)
derive newtype instance Monad (AppM e c)
derive newtype instance MonadAsk c (AppM e c)
derive newtype instance MonadEffect (AppM e c)
derive newtype instance MonadAff (AppM e c)
derive newtype instance MonadThrow e (AppM e c)
derive newtype instance MonadError e (AppM e c)

type App = AppM Error Config

type BackM = AppM Backend.Error Config

run ∷ Config → App ~> Aff
run c m = runReaderT (runExceptT (unwrap m)) c >>= case _ of
  Right a → pure a
  Left (BackendError be) → throwError $ error $ show be

config ∷ ∀ e c. AppM e c c
config = ask

hoistAppM ∷ ∀ a c e e'. (e → e') → AppM e c a → AppM e' c a
hoistAppM = over AppM <<< withExceptT
