{ name = "purescript-messenger-frontend"
, dependencies =
  [ "aff"
  , "affjax"
  , "argonaut-codecs"
  , "argonaut-core"
  , "arrays"
  , "bifunctors"
  , "codec-argonaut"
  , "common"
  , "console"
  , "contravariant"
  , "effect"
  , "either"
  , "enums"
  , "errors"
  , "exceptions"
  , "foldable-traversable"
  , "free"
  , "freeap"
  , "halogen"
  , "halogen-subscriptions"
  , "http-methods"
  , "maybe"
  , "newtype"
  , "ordered-collections"
  , "prelude"
  , "profunctor"
  , "quickcheck"
  , "refs"
  , "routing"
  , "routing-duplex"
  , "spec"
  , "strings"
  , "svg-parser-halogen"
  , "test-unit"
  , "transformers"
  , "tuples"
  , "unicode"
  , "unsafe-coerce"
  , "web-events"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
