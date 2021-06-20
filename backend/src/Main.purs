module Main where

import Prelude 
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Console (log)
import Node.Express.App as Express
import Node.Express.Request as Request
import Node.Express.Response as Response
import Node.Express.Types (Middleware)

foreign import jsonBodyParser :: Middleware

app :: Express.App
app = do
  Express.useExternal jsonBodyParser
  Express.post "/login" do
    Request.getBodyParam "name"
      >>= case _ of
          Nothing -> Response.send "Name not found"
          Just name -> Response.send ("Hello, " <> name)

main :: Effect Unit
main =
  void
    $ Express.listenHttp app 8080 \_ ->
        log $ "Listening on " <> show 8080
