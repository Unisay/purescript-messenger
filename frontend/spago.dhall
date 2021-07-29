{ name = "purescript-messenger-frontend"
, dependencies =
  [ "aff"
  , "affjax"
  , "argonaut-codecs"
  , "argonaut-core"
  , "codec-argonaut"
  , "console"
  , "effect"
  , "either"
  , "halogen"
  , "http-methods"
  , "maybe"
  , "prelude"
  , "profunctor"
  , "psci-support"
  , "strings"
  , "tuples"
  , "web-events"
  , "web-html"
  ]
, packages = ../packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs", "../common/src/**/*.purs" ]
}
