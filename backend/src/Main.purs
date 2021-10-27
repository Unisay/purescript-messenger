module Main where

import Prelude

import Auth (LoginResult(..), LogoutReason(..), LogoutResult(..), login, logout)
import Database as Db
import Effect (Effect)
import Effect.Aff (Aff, launchAff_)
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
mainWithResources resources = liftEffect $ void $
  listenHttp (app resources) tcpPort \_ -> log $ "Listening on " <> show tcpPort
  where
  tcpPort = 8081

app :: Resources -> App
app resources = do
  Middleware.init
  get "/" do
    Response.send "Messenger API"
  post "/login" $ runServerM do
    loginRequest <- readBody 
    loginResponse <- login resources loginRequest 
    case loginResponse of
      LoginSuccess -> reply "Success"
      LoginFailure -> replyWithStatus 403 "Failure"
  post "/logout" $ runServerM do
    logoutRequest <- readBody
    case logout logoutRequest of
      LogoutSuccess Timeout -> reply "Logout successful: timeout."
      LogoutSuccess UserAction -> reply "Logout successful: bye bye!"

