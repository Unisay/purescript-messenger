module Middleware where

import Prelude

import Data.String as Str
import Effect.Class.Console (log)
import Node.Express.App (App, use, useExternal)
import Node.Express.Handler (Handler, next)
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

init :: App
init = do
  use requestLogging
  useExternal cors
  useExternal json
