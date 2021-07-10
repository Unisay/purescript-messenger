{ name = "purescript-messenger-backend"
, dependencies =
  [ "console"
  , "effect"
  , "express"
  , "maybe"
  , "prelude"
  , "psci-support"
  , "strings"
  ]
, packages = ../packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs", "../common/src/**/*.purs" ]
}
