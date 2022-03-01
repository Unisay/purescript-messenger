{ name = "purescript-messenger-frontend"
, dependencies =
  [ "aff"
  , "affjax"
  , "argonaut-codecs"
  , "arrays"
  , "bifunctors"
  , "codec-argonaut"
  , "common"
  , "console"
  , "effect"
  , "either"
  , "errors"
  , "foldable-traversable"
  , "free"
  , "freeap"
  , "halogen"
  , "halogen-subscriptions"
  , "http-methods"
  , "maybe"
  , "newtype"
  , "prelude"
  , "profunctor"
  , "quickcheck"
  , "routing"
  , "routing-duplex"
  , "strings"
  , "svg-parser-halogen"
  , "tailrec"
  , "test-unit"
  , "transformers"
  , "unicode"
  , "unsafe-coerce"
  , "web-events"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
