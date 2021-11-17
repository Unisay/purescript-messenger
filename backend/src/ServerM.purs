module ServerM where

import Prelude

import Control.Monad.Error.Class (class MonadError, class MonadThrow)
import Control.Monad.Except (ExceptT(..), lift, runExcept, runExceptT, withExceptT)
import Data.Array as Array
import Data.Bifunctor (lmap)
import Data.Either (Either(..))
import Data.Newtype (class Newtype, unwrap, wrap)
import Database (DbM)
import Database as Database
import Effect.Aff (catchError, throwError)
import Effect.Aff as Aff
import Effect.Aff.Class (class MonadAff)
import Effect.Class (class MonadEffect)
import Effect.Class.Console (log)
import Foreign (MultipleErrors, renderForeignError)
import Foreign.Class (class Decode)
import Node.Express.Handler (Handler, HandlerM)
import Node.Express.Request as Request
import Node.Express.Response (setStatus, send)
import Node.Express.Response as Response

type Server = ServerM Unit

data Error
  = BodyDecodingErr MultipleErrors
  | DatabaseErr Database.Error

newtype ServerM a = ServerM (ExceptT Error HandlerM a)

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
  Left (DatabaseErr (Database.Decoding foreignErrors)) -> do
    setStatus 400
    send $ Array.fromFoldable $ map renderForeignError foreignErrors
  Left (DatabaseErr (Database.ConstraintViolation column)) -> do
    case column of
      Database.Username -> do
        setStatus 409
        send "User already registered"
      Database.Email -> do
        setStatus 409
        send "Email already registered."
  Left (DatabaseErr (Database.Other message)) -> do
    setStatus 500
    log message
    send "Internal Server Error"
  Left (BodyDecodingErr me) -> do
    setStatus 400
    send $ Array.fromFoldable $ map renderForeignError me
  Right _ -> pure unit

-- Lifted functions

liftHandler :: forall a. HandlerM a -> ServerM a
liftHandler = wrap <<< lift

liftDbM :: forall a. DbM HandlerM a -> ServerM a
liftDbM dbm = wrap $ withExceptT DatabaseErr dbm

readBody :: forall b. Decode b => ServerM b
readBody =
  liftHandler (Request.getBody) >>=
    wrap <<< wrap <<< pure <<< lmap BodyDecodingErr <<< runExcept

replyWithStatus :: Int -> String -> Server
replyWithStatus s m = liftHandler (Response.setStatus s) *> reply m

reply :: String -> Server
reply = liftHandler <<< Response.send
