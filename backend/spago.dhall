{ name = "purescript-messenger-backend"
, dependencies =
  [ "aff"
  , "aff-promise"
  , "argonaut-codecs"
  , "arrays"
  , "bifunctors"
  , "common"
  , "console"
  , "datetime"
  , "effect"
  , "either"
  , "enums"
  , "exceptions"
  , "express"
  , "foreign"
  , "foreign-generic"
  , "integers"
  , "lists"
  , "maybe"
  , "newtype"
  , "node-jwt"
  , "node-process"
  , "node-sqlite3"
  , "now"
  , "prelude"
  , "random"
  , "spec"
  , "strings"
  , "transformers"
  , "unfoldable"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
