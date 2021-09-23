{ name = "purescript-messenger-backend"
, dependencies =
  [ "argonaut"
  , "arrays"
  , "console"
  , "effect"
  , "either"
  , "express"
  , "foreign"
  , "foreign-generic"
  , "maybe"
  , "prelude"
  , "psci-support"
  , "strings"
  , "transformers"
  ]
, packages = ../packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs", "../common/src/**/*.purs" ]
}
