module Chat.Api.Http where

import Prelude

import Chat.Presence (Presence)
import Data.Auth.Token (Token)
import Data.Username (Username)

data SignInResponse
  = SignedIn Token
  | Forbidden

instance Show SignInResponse where
  show = case _ of
    SignedIn _token → "Signed In"
    Forbidden → "Sign in is forbidden"

data SignUpResponse
  = SignedUp
  | AlreadyRegistered

data ListUsersResponse
  = Successful (Array UserPresence)
  | Unauthorized

type SignInResponseBody = { token ∷ Token }

type SignUpResponseBody = { errors ∷ Array String }

type UserPresence = { username :: Username, presence :: Presence }

