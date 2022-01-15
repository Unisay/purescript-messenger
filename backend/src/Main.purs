module Main where

import Prelude

import Auth
  ( SigninResult(..)
  , SignoutReason(..)
  , SignoutResult(..)
  , SignupResult(..)
  , signin
  , signout
  , signup
  , tokenInfo
  )
import Chat as Chat
import Data.Either (Either(..), hush)
import Data.Maybe (Maybe(..), maybe)
import Data.Password (Password)
import Data.Username (Username)
import Data.Username as Username
import Database as Db
import Effect (Effect)
import Effect.Aff (Aff, launchAff_, never, throwError)
import Effect.Class (liftEffect)
import Effect.Class.Console (log, logShow)
import Middleware as Middleware
import Node.Express.App (App, delete, get, listenHttp, post, put)
import Node.Express.Response as Response
import Node.Jwt as Jwt
import Node.Process (lookupEnv)
import SQLite3 as SQLite
import ServerM
  ( Error(..)
  , ServerM
  , readBody
  , readPathParam
  , readToken
  , reply
  , replyJson
  , replyStatus
  , runServerM
  )

type Resources =
  { dbConn :: SQLite.DBConnection
  , jwtSecret :: Jwt.Secret
  }

main :: Effect Unit
main = launchAff_ $ Db.withConnection \dbConn -> do
  liftEffect (lookupEnv "JWT_SECRET") >>= case _ of
    Nothing ->
      log "Please specify JWT_SECRET env variable"
    Just jwtSecret ->
      mainWithResources { dbConn, jwtSecret: Jwt.Secret jwtSecret }

mainWithResources :: Resources -> Aff Unit
mainWithResources resources = do
  liftEffect $ void $ listenHttp (app resources) tcpPort \_ ->
    log $ "Listening on " <> show tcpPort
  never
  where
  tcpPort = 8081

app :: Resources -> App
app { dbConn, jwtSecret } = do
  Middleware.init
  get "/" $ Response.send "Messenger API"
  put "/users/:username" $ runServerM dbConn do
    username <- readUsername
    { email, password } ::
      { email :: String, password :: Password } <- readBody
    signup { email, password, username } >>= case _ of
      SignedUp -> replyStatus 200
      UserInfoUpdated -> replyStatus 200
      NotSignedUpInvalidCredentials -> replyStatus 409
  put "/users/:username/session" $ runServerM dbConn do
    username <- readUsername
    { password } :: { password :: Password } <- readBody
    signin jwtSecret username password >>= case _ of
      SigninSuccess token -> replyJson { token }
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
    Nothing -> replyStatus 401
    Just token -> case tokenInfo token jwtSecret of
      Left errors -> logShow errors *> replyStatus 401
      Right username -> callback username
