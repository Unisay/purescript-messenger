{ name = "purescript-messenger-backend"
, dependencies =
  [ "arrays"
  , "console"
  , "debug"
  , "effect"
  , "either"
  , "express"
  , "foreign"
  , "foreign-generic"
  , "node-sqlite3"
  , "prelude"
  , "psci-support"
  , "strings"
  , "transformers"
  ]
, packages = ../packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs", "../common/src/**/*.purs" ]
}
