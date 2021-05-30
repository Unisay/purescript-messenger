{ name = "purescript-messenger-frontend"
, dependencies =
  [ "aff"
  , "affjax"
  , "arrays"
  , "codec-argonaut"
  , "console"
  , "effect"
  , "either"
  , "halogen"
  , "maybe"
  , "prelude"
  , "profunctor"
  , "psci-support"
  , "strings"
  , "tuples"
  , "web-events"
  ]
, packages = ../packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs", "../common/src/**/*.purs" ]
}
