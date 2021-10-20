module Auth where

import Prelude

import Control.Monad.Error.Class (throwError)
import Control.Monad.Except (runExcept)
import Data.Either (Either(..))
import Foreign as Foreign
import Foreign.Generic.Class (class Decode)
import Node.Express.Handler (HandlerM)

type LoginRequest = { username :: String, password :: String }
data LoginResult = LoginSuccess | LoginFailure
type LogoutRequest = { reason :: LogoutReason }
data LogoutReason = Timeout | UserAction
data LogoutResult = LogoutSuccess LogoutReason

instance decodeLogoutReason :: Decode LogoutReason where
  decode f = case runExcept (Foreign.readInt f) of
    Left errs -> throwError errs
    Right 0 -> pure Timeout
    Right 1 -> pure UserAction
    Right r ->
      Foreign.fail $ Foreign.ForeignError $ "Unknown logout reason: " <> show r

type User =
  { email :: String
  , username :: String
  , password :: String
  }

login :: LoginRequest -> HandlerM LoginResult
login { username, password }
  | username == "root" && password == "qwerty123" = pure LoginSuccess
  | otherwise = pure LoginFailure

logout :: LogoutRequest -> LogoutResult
logout { reason } = LogoutSuccess reason
