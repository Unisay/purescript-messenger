{ name = "purescript-messenger-frontend"
, dependencies =
  [ "aff"
  , "affjax"
  , "affjax-web"
  , "argonaut-codecs"
  , "argonaut-core"
  , "arrays"
  , "bifunctors"
  , "codec-argonaut"
  , "common"
  , "datetime"
  , "dom-indexed"
  , "effect"
  , "either"
  , "enums"
  , "exceptions"
  , "foldable-traversable"
  , "foreign-object"
  , "free"
  , "freeap"
  , "halogen"
  , "halogen-subscriptions"
  , "http-methods"
  , "jwt"
  , "newtype"
  , "now"
  , "ordered-collections"
  , "prelude"
  , "profunctor"
  , "quickcheck"
  , "refs"
  , "remotedata"
  , "routing"
  , "routing-duplex"
  , "spec"
  , "strings"
  , "test-unit"
  , "transformers"
  , "tuples"
  , "unicode"
  , "unsafe-coerce"
  , "web-events"
  , "web-html"
  , "web-storage"
  , "web-uievents"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
