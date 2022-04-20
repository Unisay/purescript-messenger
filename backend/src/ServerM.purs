module ServerM where

import Prelude

import Chat.Api.Http.Problem as Problem
import Control.Monad.Error.Class (class MonadThrow)
import Control.Monad.Except
  ( ExceptT
  , except
  , lift
  , runExcept
  , runExceptT
  , withExceptT
  )
import Control.Monad.Reader (ReaderT(..), mapReaderT, runReaderT)
import Data.Argonaut.Encode (class EncodeJson, encodeJson)
import Data.Array as Array
import Data.Auth.Token (Token)
import Data.Auth.Token as Token
import Data.Bifunctor (lmap)
import Data.Either (Either(..), hush)
import Data.Maybe (Maybe(..), maybe)
import Data.Newtype (class Newtype, wrap)
import Data.String as Str
import Database (DbM)
import Database as Database
import Effect.Aff (throwError)
import Effect.Aff.Class (class MonadAff)
import Effect.Class (class MonadEffect)
import Effect.Class.Console as Console
import Foreign (MultipleErrors, renderForeignError)
import Foreign.Class (class Decode)
import Node.Express.Handler (Handler, HandlerM)
import Node.Express.Request as Request
import Node.Express.Response as Response
import SQLite3 as SQLite

type Server = ServerM Unit

data Error
  = BodyDecodingErr MultipleErrors
  | DatabaseErr Database.Error
  | RouteParamIsMissing

newtype ServerM a = ServerM
  ( ReaderT SQLite.DBConnection
      (ExceptT Error HandlerM)
      a
  )

derive instance newtypeServerM :: Newtype (ServerM a) _
derive newtype instance functorServerM :: Functor ServerM
derive newtype instance applyServerM :: Apply ServerM
derive newtype instance applicativeServerM :: Applicative ServerM
derive newtype instance bindServerM :: Bind ServerM
derive newtype instance monadServerM :: Monad ServerM
derive newtype instance monadEffectServerM :: MonadEffect ServerM
derive newtype instance monadAffServerM :: MonadAff ServerM
derive newtype instance monadThrowServerM :: MonadThrow Error ServerM

runServerM :: SQLite.DBConnection -> Server -> Handler
runServerM dbconn (ServerM s) = runExceptT (runReaderT s dbconn) >>= case _ of
  Left (DatabaseErr (Database.Decoding foreignErrors)) -> do
    Console.logShow foreignErrors
    Response.setStatus 400
    Response.sendJson { error: [ Problem.internalServerError Nothing ] }
  Left (DatabaseErr (Database.ConstraintViolation column)) ->
    case column of
      Database.Username -> do
        Response.setStatus 409
        Response.sendJson { errors: [ Problem.usernameExists ] }
      Database.Email -> do
        Response.setStatus 409
        Response.sendJson { errors: [ Problem.emailExists ] }
  Left (DatabaseErr (Database.Other message)) -> do
    Response.setStatus 500
    Console.log $ "Database Error: " <> message
    Response.sendJson { errors: [ Problem.internalServerError Nothing ] }
  Left (BodyDecodingErr decodingErrs) -> do
    Response.setStatus 400
    Response.sendJson
      { errors: Problem.badRequest <<< map renderForeignError $
          Array.fromFoldable decodingErrs
      }
  Left RouteParamIsMissing -> do
    Response.setStatus 404
    Response.send ""
  Right _ -> pure unit

-- Lifted functions

liftHandler :: forall a. HandlerM a -> ServerM a
liftHandler = wrap <<< lift <<< lift

liftDbM :: forall a. DbM HandlerM a -> ServerM a
liftDbM = ServerM <<< mapReaderT (withExceptT DatabaseErr)

readBody :: forall b. Decode b => ServerM b
readBody = do
  body <- liftHandler (Request.getBody)
  ServerM (lift (except (lmap BodyDecodingErr (runExcept body))))

type ParamName = String

readPathParam :: ParamName -> ServerM String
readPathParam name =
  liftHandler (Request.getRouteParam name) >>=
    maybe (throwError RouteParamIsMissing) pure

type HeaderName = String

readHeader :: HeaderName -> ServerM (Maybe String)
readHeader = liftHandler <<< Request.getRequestHeader

readToken :: ServerM (Maybe Token)
readToken = readHeader "Authorization" <#> \header -> header >>=
  Str.trim >>> Str.drop 7 >>> Str.trim >>> Token.parse >>> hush

setStatus :: Int -> Server
setStatus = liftHandler <<< Response.setStatus

replyStatus :: Int -> Server
replyStatus status = setStatus status *> reply ""

reply :: String -> Server
reply = liftHandler <<< Response.send

replyJson :: forall a. EncodeJson a => a -> Server
replyJson = liftHandler <<< Response.sendJson <<< encodeJson
