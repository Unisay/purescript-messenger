module Main where

import Prelude

import Control.Monad.Except (runExcept)
import Data.Either (Either(..))
import Effect (Effect)
import Effect.Class.Console (log)
import Middleware as Middleware
import Node.Express.App (App, get, listenHttp, post)
import Node.Express.Request as Request
import Node.Express.Response as Response

main :: Effect Unit
main = void $ listenHttp app tcpPort \_ -> log $ "Listening on " <> show tcpPort
  where
  tcpPort = 8081

type LoginRequest = { username :: String, password :: String }

app :: App
app = do
  Middleware.init
  get "/" do
    Response.send "Messenger API"
  post "/login" do
    Request.getBody >>= runExcept >>> case _ of
      Left multipleErrors -> do
        Response.setStatus 400
        Response.send multipleErrors
      Right ({ username, password } :: LoginRequest) -> do
        if username == "root" && password == "qwerty123" 
         then Response.send "Success"
         else do
           Response.setStatus 403           
           Response.send "Failure"

