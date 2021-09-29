module Main where

import Prelude

import Control.Monad.Error.Class (throwError)
import Control.Monad.Except (ExceptT, mapExceptT, runExcept, runExceptT)
import Control.Monad.Trans.Class (lift)
import Data.Array as Array
import Data.Bifunctor (lmap)
import Data.Either (Either(..))
import Data.Identity (Identity)
import Data.List.NonEmpty (NonEmptyList)
import Data.Newtype (class Newtype, over, unwrap, wrap)
import Effect (Effect)
import Effect.Class.Console (log)
import Foreign (ForeignError, MultipleErrors, renderForeignError)
import Foreign as Foreign
import Foreign.Generic.Class (class Decode)
import Middleware as Middleware
import Node.Express.App (App, get, listenHttp, post)
import Node.Express.Handler (Handler, HandlerM)
import Node.Express.Request as Request
import Node.Express.Response as Response
import Unsafe.Coerce (unsafeCoerce)

main :: Effect Unit
main = void $ listenHttp app tcpPort \_ -> log $ "Listening on " <> show tcpPort
  where
  tcpPort = 8081

type LoginRequest = { username :: String, password :: String }

data LogoutReason = Timeout | UserAction

instance decodeLoginReason :: Decode LogoutReason where
  decode f = case runExcept (Foreign.readInt f) of
    Left errs -> throwError errs
    Right 0 -> pure Timeout
    Right 1 -> pure UserAction
    Right r ->
      Foreign.fail $ Foreign.ForeignError $ "Unknown logout reason: " <> show r

type LogoutRequest = { reason :: LogoutReason }

newtype ServerM a = ServerM (HandlerM (ExceptT MultipleErrors Identity a))

instance Functor ServerM where
  map f = over ServerM (map (map f))

instance Apply ServerM where
  apply = unsafeCoerce "Homework"

instance Applicative ServerM where
  pure = unsafeCoerce "Homework"

instance Bind ServerM where
  bind = unsafeCoerce "Homework"

derive instance newtypeServerM :: Newtype (ServerM a) _

runServerM :: forall a. ServerM a -> HandlerM (ExceptT MultipleErrors Identity a)
runServerM = unwrap

app :: App
app = do
  Middleware.init
  get "/" do
    Response.send "Messenger API"
  -- post "/login" $ withBody \loginRequest -> do
  --   if login loginRequest then Response.send "Success"
  --   else do
  --     Response.setStatus 403
  --     Response.send "Failure"
  post "/logout" $ handleErrors $ runServerM $ do
    logoutRequest :: LogoutRequest <- wrap Request.getBody
    pure unit
    -- wrap case logoutRequest.reason of
    --   Timeout -> Response.send "Logout successful: timeout."
    --   UserAction -> Response.send "Logout successful: bye bye!"

handleErrors :: HandlerM (ExceptT MultipleErrors Identity Unit) -> HandlerM Unit
handleErrors handlerHasErrors = handlerHasErrors >>= runExcept >>> case _ of
  Left multipleErrors -> do
    Response.setStatus 400
    Response.send $ Array.fromFoldable $ map renderForeignError multipleErrors
  Right _ -> pure unit

-- withBody :: forall body. Decode body => (body -> Handler) -> Handler
-- withBody cont =
--   Request.getBody >>= runExcept >>> case _ of
--     Left multipleErrors -> do
--       Response.setStatus 400
--       Response.send $ Array.fromFoldable $ map renderForeignError multipleErrors
--     Right body ->
--       cont body

-- Business Logic:
login :: LoginRequest -> Boolean
login { username, password } =
  username == "root" && password == "qwerty123"
