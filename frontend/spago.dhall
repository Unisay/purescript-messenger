{ name = "purescript-messenger-frontend"
, dependencies =
  [ "aff"
  , "affjax"
  , "argonaut-codecs"
  , "codec-argonaut"
  , "console"
  , "effect"
  , "either"
  , "halogen"
  , "http-methods"
  , "maybe"
  , "newtype"
  , "prelude"
  , "profunctor"
  , "psci-support"
  , "strings"
  , "web-events"
  , "web-html"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs", "../common/src/**/*.purs" ]
}
