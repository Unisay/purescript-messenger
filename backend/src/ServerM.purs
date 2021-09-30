module ServerM where

import Prelude

import Control.Monad.Except (except, runExcept)
import Data.Array as Array
import Data.Either (Either(..))
import Data.Newtype (class Newtype, over, unwrap, wrap)
import Foreign (F, renderForeignError)
import Node.Express.Handler (Handler, HandlerM)
import Node.Express.Response (setStatus, send)

type Server = ServerM Unit

type ErrorsM = F

newtype ServerM a = ServerM (HandlerM (ErrorsM a))

instance Functor ServerM where
  map f = over ServerM (map (map f))

instance Apply ServerM where
  apply (ServerM hef) (ServerM hea) = ServerM $ apply (map apply hef) hea

instance Applicative ServerM where
  pure = wrap <<< pure <<< pure

instance Bind ServerM where
  bind (ServerM hea) f = ServerM do
    ea <- hea
    case runExcept ea of
      Left errs -> pure $ except $ Left errs
      Right a -> unwrap $ f a

derive instance newtypeServerM :: Newtype (ServerM a) _

liftErrors :: forall a. ErrorsM a -> ServerM a
liftErrors = wrap <<< pure

liftHandler :: forall a. HandlerM a -> ServerM a
liftHandler = wrap <<< map pure

lift :: forall a. HandlerM (ErrorsM a) -> ServerM a
lift = wrap

runServerM :: Server -> Handler
runServerM = unwrap >>> \handlerHasErrors ->
  handlerHasErrors >>= runExcept >>> case _ of
    Left multipleErrors -> do
      setStatus 400
      send $ Array.fromFoldable $ map renderForeignError multipleErrors
    Right _ -> pure unit
