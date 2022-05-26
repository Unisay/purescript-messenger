{ name = "purescript-messenger-common"
, dependencies =
  [ "argonaut-codecs"
  , "arrays"
  , "bifunctors"
  , "codec-argonaut"
  , "console"
  , "effect"
  , "either"
  , "email-validate"
  , "foreign"
  , "foreign-generic"
  , "maybe"
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
