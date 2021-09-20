{ name = "purescript-messenger-backend"
, dependencies =
  [ "argonaut"
  , "console"
  , "effect"
  , "either"
  , "express"
  , "foreign"
  , "maybe"
  , "prelude"
  , "psci-support"
  , "strings"
  , "transformers"
  ]
, packages = ../packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs", "../common/src/**/*.purs" ]
}
