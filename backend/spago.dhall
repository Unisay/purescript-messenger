{ name = "purescript-messenger-backend"
, dependencies =
  [ "arrays"
  , "bifunctors"
  , "console"
  , "effect"
  , "either"
  , "express"
  , "foreign"
  , "foreign-generic"
  , "identity"
  , "lists"
  , "newtype"
  , "prelude"
  , "psci-support"
  , "strings"
  , "transformers"
  ]
, packages = ../packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs", "../common/src/**/*.purs" ]
}
