let upstream =
      https://github.com/purescript/package-sets/releases/download/psc-0.15.2-20220610/packages.dhall
        sha256:348212b7c79da7d343bed71b48ed164d426f1977f92196babac49bd560b32e75

let overrides = {=}

let additions =
      { svg-parser =
        { repo = "https://github.com/unisay/purescript-svg-parser.git"
        , version = "master"
        , dependencies = [ "prelude", "string-parsers" ]
        }
      , svg-parser-halogen =
        { repo = "https://github.com/unisay/purescript-svg-parser-halogen.git"
        , version = "master"
        , dependencies = [ "prelude", "halogen", "svg-parser" ]
        }
      , node-jwt =
        { dependencies =
          [ "effect"
          , "console"
          , "options"
          , "prelude"
          , "newtype"
          , "aff"
          , "aff-promise"
          , "psci-support"
          ]
        , repo = "https://github.com/gaku-sei/purescript-node-jwt.git"
        , version = "master"
        }
      , foreign-generic =
        { repo =
            "https://github.com/working-group-purescript-es/purescript-foreign-generic.git"
        , version = "v0.15.0-updates"
        , dependencies = [ "effect", "foreign", "foreign-object" ]
        }
      , hoist-error =
        { repo = "https://github.com/Unisay/purescript-hoist-error.git"
        , version = "v1.0.1"
        , dependencies =
          [ "aff"
          , "bifunctors"
          , "effect"
          , "either"
          , "maybe"
          , "strings"
          , "transformers"
          ]
        }
      }

in  (overrides // upstream // additions)
  with common = ../common/spago.dhall as Location
