module AppM where

import Prelude

import Backend as Backend
import Config (Config)
import Control.Monad.Error.Class (class MonadError, class MonadThrow)
import Control.Monad.Except (ExceptT, runExceptT, throwError, withExceptT)
import Control.Monad.Reader (class MonadAsk, ReaderT, runReaderT)
import Control.Monad.Reader.Class (ask)
import Data.Either (either)
import Data.Newtype (class Newtype, over)
import Effect.Aff (Aff, error)
import Effect.Aff.Class (class MonadAff)
import Effect.Class (class MonadEffect, liftEffect)
import Halogen.Subscription as HS

newtype Error = BackendError Backend.Error

derive newtype instance Show Error

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

run ∷ ∀ e c. Show e ⇒ c → HS.Listener e → AppM e c ~> Aff
run c errorListener (AppM m) =
  runReaderT (runExceptT m) c >>= either handleError pure
  where
  handleError ∷ ∀ a. e → Aff a
  handleError appError = liftEffect do
    HS.notify errorListener appError
    throwError $ error $ show appError

config ∷ ∀ e c. AppM e c c
config = ask

hoistAppM ∷ ∀ a c e e'. (e → e') → AppM e c a → AppM e' c a
hoistAppM = over AppM <<< withExceptT
