{ name = "purescript-messenger-backend"
, dependencies =
  [ "console"
  , "effect"
  , "either"
  , "express"
  , "maybe"
  , "prelude"
  , "psci-support"
  , "transformers"
  ]
, packages = ../packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs", "../common/src/**/*.purs" ]
}
