module Printer where

import Prelude

import Data.Array ((:))
import Data.String as Str
import Data.String.Extra (camelCase)

printModule :: Array String -> String
printModule classNames =
  Str.joinWith "\n"
    $ "module Tailwind where"
    : ""
    : "import Web.HTML.Common (ClassName(..))"
    : map printClassName classNames

printClassName :: String -> String
printClassName name =
  Str.joinWith "\n"
    [ ""
    , pname <> " :: ClassName"
    , pname <> " = ClassName \"" <> name <> "\""
    ]
  where
  pname = camelCase name

