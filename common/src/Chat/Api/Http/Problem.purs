module Chat.Api.Http.Problem where

import Prelude

import Data.Array as Array
import Data.Maybe (Maybe(..))
import Data.String as String

type Problem =
  { type :: String
  , title :: String
  , href :: Maybe String
  , status :: Maybe Int
  , detail :: Maybe String
  , instance :: Maybe String
  }

defProblem :: { type :: String, title :: String } -> Problem
defProblem p =
  { type: p.type
  , title: p.title
  , href: Nothing
  , status: Nothing
  , detail: Nothing
  , instance: Nothing
  }

usernameExists :: Problem
usernameExists =
  ( defProblem
      { type: "urn:puremess:be:constraint-violation:unique:username"
      , title: "User already registered"
      }
  )
    { status = Just 409 }

emailExists :: Problem
emailExists =
  ( defProblem
      { type: "urn:puremess:be:constraint-violation:unique:email"
      , title: "Email already registered"
      }
  )
    { status = Just 409 }

internalServerError :: Maybe (Array String) -> Problem
internalServerError mbArr =
  ( defProblem
      { type: "urn:puremess:be:internal-server-error"
      , title: "Internal Server Error"
      }
  )
    { status = Just 500
    , detail = Array.fold >>> String.trim
        <$> map (map $ flip append "; ") mbArr
    }

badRequest :: Maybe (Array String) -> Problem
badRequest mbArr =
  ( defProblem
      { type: "urn:puremess:be:bad-request-error"
      , title: "Bad request error"
      }
  )
    { status = Just 400
    , detail = Array.fold >>> String.trim
        <$> map (map $ flip append "; ") mbArr
    }
