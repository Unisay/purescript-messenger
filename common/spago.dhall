{ name = "purescript-messenger-common"
, dependencies =
  [ "argonaut-codecs"
  , "arrays"
  , "bifunctors"
  , "codec-argonaut"
  , "console"
  , "datetime"
  , "effect"
  , "either"
  , "email-validate"
  , "foreign"
  , "foreign-generic"
  , "maybe"
  , "newtype"
  , "numbers"
  , "prelude"
  , "profunctor"
  , "quickcheck"
  , "strings"
  , "transformers"
  , "tuples"
  , "unicode"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
