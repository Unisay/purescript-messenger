module Printer where

import Prelude

import Data.Array ((:))
import Data.String as Str
import Data.Tuple (Tuple(..))

printModule :: Array (Tuple String String) -> String
printModule classNames =
  Str.joinWith "\n"
    $ "module Tailwind where"
    : ""
    : "import Web.HTML.Common (ClassName(..))"
    : map printClassName classNames

printClassName :: Tuple String String -> String
printClassName (Tuple pursName tailwindName) =
  Str.joinWith "\n"
    [ ""
    , pursName <> " :: ClassName"
    , pursName <> " = ClassName \"" <> tailwindName <> "\""
    ]

