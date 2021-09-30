module Main where

import Prelude

import Auth (LoginResult(..), LogoutReason(..), LogoutResult(..), login, logout)
import Effect (Effect)
import Effect.Class.Console (log)
import Foreign.Generic.Class (class Decode)
import Middleware as Middleware
import Node.Express.App (App, get, listenHttp, post)
import Node.Express.Request as Request
import Node.Express.Response as Response
import ServerM (Server, ServerM, lift, liftHandler, runServerM)

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

-- Lifted functions
readBody :: forall b. Decode b => ServerM b
readBody = lift Request.getBody

replyWithStatus :: Int -> String -> Server
replyWithStatus s m = do
  liftHandler (Response.setStatus s)
  reply m

reply :: String -> Server
reply = liftHandler <<< Response.send

