module Main where

import Prelude

import Auth (LoginResult(..), LogoutReason(..), LogoutResult(..), signin, signout, signup)
import Database as Db
import Effect (Effect)
import Effect.Aff (Aff, launchAff_, never)
import Effect.Class (liftEffect)
import Effect.Class.Console (log)
import Middleware as Middleware
import Node.Express.App (App, get, listenHttp, post)
import Node.Express.Response as Response
import SQLite3 as SQLite
import ServerM (readBody, reply, replyWithStatus, runServerM)

type Resources = SQLite.DBConnection

main :: Effect Unit
main = launchAff_ $ Db.withConnection mainWithResources

mainWithResources :: Resources -> Aff Unit
mainWithResources resources = do
  liftEffect $ void $ listenHttp (app resources) tcpPort \_ ->
    log $ "Listening on " <> show tcpPort
  never
  where
  tcpPort = 8081

app :: Resources -> App
app resources = do
  Middleware.init
  get "/" $ Response.send "Messenger API"
  post "/signup" $ runServerM do
    readBody >>= signup resources
    replyWithStatus 201 "Created" 
  post "/signin" $ runServerM $ 
    readBody >>= signin resources >>= case _ of
      LoginSuccess -> reply "Success"
      LoginFailure -> replyWithStatus 403 "Failure"
  post "/signout" $ runServerM do
    logoutRequest <- readBody
    case signout logoutRequest of
      LogoutSuccess Timeout -> reply "Logout successful: timeout."
      LogoutSuccess UserAction -> reply "Logout successful: bye bye!"

