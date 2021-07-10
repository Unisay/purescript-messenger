module Main where

import Prelude
import Data.Maybe (Maybe(..))
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
    name <- Request.getBodyParam "name"
    case name of
      Nothing -> Response.send "Name not found"
      Just value -> Response.send $ "Hello, " <> value
