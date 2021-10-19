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

type Server = ServerM Unit

type ServerM a = ExceptT MultipleErrors HandlerM a

runServerM :: Server -> Handler
runServerM s = runExceptT s >>= case _ of
  Left foreignErrors -> do
    setStatus 400
    send $ Array.fromFoldable $ map renderForeignError foreignErrors
  Right _ -> pure unit

-- Lifted functions

readBody :: forall b. Decode b => ServerM b
readBody = ExceptT $ runExcept <$> Request.getBody

replyWithStatus :: Int -> String -> Server
replyWithStatus s m = lift (Response.setStatus s) *> reply m

reply :: String -> Server
reply = lift <<< Response.send
