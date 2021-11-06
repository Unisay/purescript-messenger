module ServerM where

import Prelude

import Effect.Aff (catchError, throwError)
import Control.Monad.Error.Class (class MonadError, class MonadThrow)
import Control.Monad.Except (ExceptT(..), lift, runExcept, runExceptT)
import Data.Array as Array
import Data.Either (Either(..))
import Data.Newtype (class Newtype, unwrap, wrap)
import Effect.Aff as Aff
import Effect.Aff.Class (class MonadAff)
import Effect.Class (class MonadEffect)
import Foreign (MultipleErrors, renderForeignError)
import Foreign.Class (class Decode)
import Node.Express.Handler (Handler, HandlerM)
import Node.Express.Request as Request
import Node.Express.Response (setStatus, send)
import Node.Express.Response as Response
import Database as Database

type Server = ServerM Unit

newtype ServerM a = ServerM (ExceptT Database.Error HandlerM a)

derive instance newtypeServerM :: Newtype (ServerM a) _
derive newtype instance functorServerM :: Functor ServerM
derive newtype instance applyServerM :: Apply ServerM
derive newtype instance applicativeServerM :: Applicative ServerM
derive newtype instance bindServerM :: Bind ServerM
derive newtype instance monadServerM :: Monad ServerM
derive newtype instance monadEffectServerM :: MonadEffect ServerM
derive newtype instance monadAffServerM :: MonadAff ServerM

instance MonadThrow Aff.Error ServerM where
  throwError = liftHandler <<< throwError

instance MonadError Aff.Error ServerM where
  catchError m f =
    wrap (wrap (catchError (unwrap (unwrap m)) (\e -> unwrap (unwrap (f e)))))

runServerM :: Server -> Handler
runServerM (ServerM s) = runExceptT s >>= case _ of
  Left (Database.Decoding foreignErrors) -> do
    setStatus 400
    send $ Array.fromFoldable $ map renderForeignError foreignErrors
  Left (Database.Constraint message) -> do
    ?handleConstraintErrors
  Left (Database.Other message) -> do
    ?handletherErrors
  Right _ -> pure unit

-- Lifted functions

liftHandler :: forall a. HandlerM a -> ServerM a
liftHandler = wrap <<< lift

readBody :: forall b. Decode b => ServerM b
readBody = ServerM $ ExceptT $ runExcept <$> Request.getBody

replyWithStatus :: Int -> String -> Server
replyWithStatus s m = liftHandler (Response.setStatus s) *> reply m

reply :: String -> Server
reply = liftHandler <<< Response.send
