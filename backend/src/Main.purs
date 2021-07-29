module Main where

import Prelude

import Data.Maybe (fromMaybe)
import Effect (Effect)
import Effect.Class.Console (log)
import Middleware as Middleware
import Node.Express.App (App, get, listenHttp, post)
import Node.Express.Request as Request
import Node.Express.Response as Response

main :: Effect Unit
main = void $ listenHttp app tcpPort \_ -> log $ "Listening on " <> show tcpPort
  where tcpPort = 8081

app :: App
app = do
  Middleware.init
  get "/" do
    Response.send "Messenger API"
  post "/login" do
    username <- Request.getBodyParam "username"
    password <- Request.getBodyParam "password"
    log $ fromMaybe "No username received" username
    log $ fromMaybe "No password received" password
    Response.send "Received"
