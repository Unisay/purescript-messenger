module Main where

import Prelude

import ServerM (readBody, reply, replyWithStatus, runServerM)
import Auth (LoginResult(..), LogoutReason(..), LogoutResult(..), login, logout)
import Effect (Effect)
import Effect.Class.Console (log)
import Middleware as Middleware
import Node.Express.App (App, get, listenHttp, post)
import Node.Express.Response as Response

main :: Effect Unit
main = void $ listenHttp app tcpPort \_ -> log $ "Listening on " <> show tcpPort
  where
  tcpPort = 8081

app :: App
app = do
  Middleware.init
  get "/" do
    Response.send "Messenger API"
  post "/login" $ runServerM $ do
    loginRequest <- readBody
    case login loginRequest of
      LoginSuccess -> reply "Success"
      LoginFailure -> replyWithStatus 403 "Failure"
  post "/logout" $ runServerM do
    logoutRequest <- readBody
    case logout logoutRequest of
      LogoutSuccess Timeout -> reply "Logout successful: timeout."
      LogoutSuccess UserAction -> reply "Logout successful: bye bye!"

