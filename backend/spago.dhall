{ name = "purescript-messenger-backend"
, dependencies = [ "console", "effect", "prelude", "psci-support" ]
, packages = ../packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs", "../common/src/**/*.purs" ]
}
