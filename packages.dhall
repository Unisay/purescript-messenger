let upstream =
      https://github.com/purescript/package-sets/releases/download/psc-0.15.4-20220805/packages.dhall
        sha256:c80e241af3ba62fc42284b9bc26b4c9bd4525eebe4ab0e9198c9bbeac102f656

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

in  overrides // upstream // additions
