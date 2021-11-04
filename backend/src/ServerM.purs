module ServerM where

import Prelude

import Control.Monad.Except (ExceptT(..), lift, runExcept, runExceptT)
import Node.Express.Response as Response
import Data.Array as Array
import Data.Either (Either(..))
import Foreign (MultipleErrors, renderForeignError)
import Foreign.Class (class Decode)
import Node.Express.Handler (Handler, HandlerM)
import Node.Express.Request as Request
import Node.Express.Response (setStatus, send)
import Control.Monad.Error.Class
import Effect.Aff as Aff

type Server = ServerM Unit

newtype ServerM a = ServerM (ExceptT MultipleErrors HandlerM a)

derive newtype instance functorServerM :: Functor ServerM
derive newtype instance applyServerM :: Apply ServerM
derive newtype instance applicativeServerM :: Applicative ServerM
derive newtype instance monadServerM :: Monad ServerM

instance MonadThrow Aff.Error ServerM where
  throwError = ?c

instance MonadError Aff.Error ServerM where
  catchError = ?x

runServerM :: Server -> Handler
runServerM (ServerM s) = runExceptT s >>= case _ of
  Left foreignErrors -> do
    setStatus 400
    send $ Array.fromFoldable $ map renderForeignError foreignErrors
  Right _ -> pure unit

-- Lifted functions

readBody :: forall b. Decode b => ServerM b
readBody = ServerM $ ExceptT $ runExcept <$> Request.getBody

replyWithStatus :: Int -> String -> Server
replyWithStatus s m = ServerM (lift (Response.setStatus s)) *> reply m

reply :: String -> Server
reply = ServerM <<< lift <<< Response.send
