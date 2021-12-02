module Main where

import Prelude

import Auth
  ( SigninResult(..)
  , SignoutReason(..)
  , SignoutResult(..)
  , SignupResult(..)
  , Username(..)
  , signin
  , signout
  , signup
  )
import Auth.Hash (Password)
import Data.Maybe (Maybe(..))
import Database as Db
import Effect (Effect)
import Effect.Aff (Aff, launchAff_, never)
import Effect.Class (liftEffect)
import Effect.Class.Console (log)
import Middleware as Middleware
import Node.Express.App (App, get, listenHttp, post, put)
import Node.Express.Request as Request
import Node.Express.Response as Response
import SQLite3 as SQLite
import ServerM (liftHandler, readBody, reply, replyStatus, runServerM)

type Resources = { dbConn :: SQLite.DBConnection }

main :: Effect Unit
main = launchAff_ $ Db.withConnection \dbConn ->
  mainWithResources { dbConn }

mainWithResources :: Resources -> Aff Unit
mainWithResources resources = do
  liftEffect $ void $ listenHttp (app resources) tcpPort \_ ->
    log $ "Listening on " <> show tcpPort
  never
  where
  tcpPort = 8081

app :: Resources -> App
app { dbConn } = do
  Middleware.init
  get "/" $ Response.send "Messenger API"
  put "/users/:username" $ runServerM do
    username <- liftHandler $ Request.getRouteParam "username"
    case username of
      Nothing -> replyStatus 404
      Just username' -> do
        { email, password } ::
          { email :: String
          , password :: Password
          } <- readBody
        signup dbConn { email, password, username: Username username' } >>= case _ of
          SignedUp -> replyStatus 200
          UserInfoUpdated -> replyStatus 200
          NotSignedUpInvalidCredentials -> replyStatus 409
  post "/signin" $ runServerM $ do
    { username, password } ::
      { username :: Username
      , password :: Password
      } <- readBody
    signin dbConn username password >>= case _ of
      SigninSuccess -> reply "Success"
      SigninFailure -> replyStatus 403
  post "/signout" $ runServerM do
    readBody <#> signout >>= case _ of
      SignoutSuccess Timeout -> reply "Signout successful: timeout."
      SignoutSuccess UserAction -> reply "Signout successful: bye bye!"

