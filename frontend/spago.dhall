{ name = "purescript-messenger-frontend"
, dependencies =
  [ "aff"
  , "affjax"
  , "argonaut-codecs"
  , "arrays"
  , "bifunctors"
  , "codec-argonaut"
  , "common"
  , "effect"
  , "either"
  , "errors"
  , "halogen"
  , "http-methods"
  , "maybe"
  , "newtype"
  , "prelude"
  , "profunctor"
  , "psci-support"
  , "routing-duplex"
  , "test-unit"
  , "transformers"
  , "web-events"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
