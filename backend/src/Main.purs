module Main where

import Prelude

import Auth (SigninResult(..), SignoutReason(..), SignoutResult(..), SignupResult(..), signin, signout, signup, tokenInfo)
import Chat as Chat
import Data.Either (Either(..), hush)
import Data.Email (Email)
import Data.Int as Int
import Data.Maybe (Maybe(..), maybe)
import Data.Password (Password)
import Data.Username (Username)
import Data.Username as Username
import Database as Db
import Effect (Effect)
import Effect.Aff (Aff, error, launchAff_, never, throwError)
import Effect.Class (liftEffect)
import Effect.Class.Console (log, logShow)
import Middleware as Middleware
import Node.Express.App (App, delete, get, listenHttp, post, put)
import Node.Jwt as Jwt
import Node.Process (lookupEnv)
import SQLite3 as SQLite
import ServerM (Error(..), ServerM, readBody, readPathParam, readToken, reply, replyJson, replyStatus, runServerM)

type Resources =
  { port :: Int
  , dbConn :: SQLite.DBConnection
  , jwtSecret :: Jwt.Secret
  , staticPath :: String
  }

main :: Effect Unit
main = launchAff_ $ initResources mainWithResources

initResources :: forall a. (Resources -> Aff a) -> Aff a
initResources callback = do
  port <- env "PORT" >>= case _ of
    Nothing -> throwError $ error "Please specify PORT env var"
    Just tcpPort -> case Int.fromString tcpPort of
      Nothing -> throwError $ error "Please specify valid PORT env var"
      Just intPort -> pure intPort
  jwtSecret <- env "JWT_SECRET" >>= case _ of
    Nothing -> throwError $ error "Please specify JWT_SECRET env var"
    Just jwtSecret -> pure $ Jwt.Secret jwtSecret
  staticPath <- env "STATIC_PATH" >>= case _ of
    Nothing -> throwError $ error "Please specify STATIC_PATH env var"
    Just path -> pure path
  Db.withConnection \dbConn -> callback { port, dbConn, jwtSecret, staticPath }
  where
  env = liftEffect <<< lookupEnv

mainWithResources :: Resources -> Aff Unit
mainWithResources res@{ port } = do
  liftEffect $ void $ listenHttp (app res) port \_ ->
    log $ "Listening on " <> show port
  never

app :: Resources -> App
app { dbConn, jwtSecret, staticPath } = do
  Middleware.init staticPath
  put "/users/:username" $ runServerM dbConn do
    username <- readUsername
    { email, password } :: { email :: Email, password :: Password } <- readBody
    signup { email, password, username } >>= case _ of
      SignedUp -> replyStatus 200
      UserInfoUpdated -> replyStatus 200
      NotSignedUpInvalidCredentials -> replyStatus 409
  put "/users/:username/session" $ runServerM dbConn do
    username <- readUsername
    { password } :: { password :: Password } <- readBody
    signin jwtSecret username password >>= case _ of
      SigninSuccess token -> do
        Chat.enter username
        replyJson { token }
      SigninFailure -> replyStatus 403
  post "/signout" $ runServerM dbConn do
    readBody <#> signout >>= case _ of
      SignoutSuccess Timeout -> reply "Signout successful: timeout."
      SignoutSuccess UserAction -> reply "Signout successful: bye bye!"
  get "/chat/users" $ runServerM dbConn $ withTokenInfo \_username ->
    Chat.users >>= replyJson
  put "/chat/users/:username" $ runServerM dbConn $ withAuthUsername \username ->
    Chat.enter username *> replyStatus 201
  delete "/chat/users/:username" $ runServerM dbConn $ withAuthUsername \username ->
    Chat.exit username *> replyStatus 200
  where
  readUsername :: ServerM Username
  readUsername = do
    s <- readPathParam "username"
    maybe (throwError RouteParamIsMissing) pure $ hush (Username.parse s)

  withAuthUsername :: (Username -> ServerM Unit) -> ServerM Unit
  withAuthUsername callback = withTokenInfo \username -> do
    usernamePath <- readUsername
    if usernamePath == username then callback username else replyStatus 403

  withTokenInfo :: (Username -> ServerM Unit) -> ServerM Unit
  withTokenInfo callback = readToken >>= case _ of
    Nothing -> replyStatus 403
    Just token -> case tokenInfo token jwtSecret of
      Left errors -> logShow errors *> replyStatus 403
      Right username -> callback username
