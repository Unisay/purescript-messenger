{ name = "purescript-messenger-backend"
, dependencies =
  [ "aff"
  , "aff-promise"
  , "argonaut-codecs"
  , "arrays"
  , "bifunctors"
  , "console"
  , "debug"
  , "effect"
  , "either"
  , "enums"
  , "exceptions"
  , "express"
  , "foreign"
  , "foreign-generic"
  , "maybe"
  , "newtype"
  , "node-sqlite3"
  , "prelude"
  , "psci-support"
  , "random"
  , "strings"
  , "transformers"
  , "unfoldable"
  ]
, packages = ../packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs", "../common/src/**/*.purs" ]
}
