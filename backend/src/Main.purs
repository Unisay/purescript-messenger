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

{-

title FE/BE

participant "FE JS App" as FEA
participant "Browser" as B
participant "Backend Server" as BES
participant "Request Logging" as MW1
participant "CORS" as MW2
participant "JSON Body Parser" as MW3
participant "BE JS App" as BEA

B->+FEA: onClickEvent
FEA->-B: Builds HTTP Post Request
B->BES: Sends HTTP Post Request
BES->+MW1: JS Request Object
MW1->-MW2: JS Request Object
MW2->+MW3: JS Request Object
MW3->-BEA: JS Request Object
BEA->-MW3: JS Response Object
MW3->MW2: JS Response Object
MW2->MW1: JS Response Object
MW1->-BES: JS Response Object
BES->+FEA: HTTP Post Response
FEA->-FEA: Decodes JSON from Response Body
FEA->B: Render decoded response data

-}

type LoginRequest = { username :: String, password :: String }

app :: App
app = do
  Middleware.init
  get "/" do
    Response.send "Messenger API"
  post "/login" do
    log $ fromMaybe "No username received" username
    log $ fromMaybe "No password received" password
    Response.send "Received"
