module Main where

import Prelude

import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Console (log)
import Node.Express.App as Express
import Node.Express.Handler (Handler)
import Node.Express.Request as Request
import Node.Express.Response as Response
import Node.Express.Types (Middleware)

foreign import jsonBodyParser :: Middleware

foreign import cors :: Handler

app :: Express.App
app = do
  Express.use cors
  Express.useExternal jsonBodyParser
  Express.get "/" (Response.send "Hi!")
  Express.post "/login" do
    Request.getBodyParam "name" >>= case _ of
      Nothing -> Response.send "Name not found"
      Just name -> Response.send ("Hello, " <> name)

main :: Effect Unit
main =
  void $ Express.listenHttp app 8081 \_ -> log $ "Listening on " <> show 8081
