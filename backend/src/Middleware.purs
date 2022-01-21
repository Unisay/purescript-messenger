module Middleware where

import Prelude

import Data.String as Str
import Effect.Class.Console (log)
import Node.Express.App (App, use, useExternal)
import Node.Express.Handler (Handler, next)
import Node.Express.Middleware.Static (static)
import Node.Express.Request (getMethod, getOriginalUrl)
import Node.Express.Types (Middleware)

foreign import json :: Middleware

foreign import cors :: Middleware

requestLogging :: Handler
requestLogging = do
  method <- getMethod
  url <- getOriginalUrl
  log $ Str.toUpper (show method) <> " " <> url
  next

type StaticPath = String

init :: StaticPath -> App
init path = do
  use $ static path
  use requestLogging
  useExternal cors
  useExternal json
