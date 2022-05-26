let upstream =
      https://github.com/purescript/package-sets/releases/download/psc-0.15.0-20220510/packages.dhall
        sha256:0b0d4db1f2f0acd3b37fa53220644ac6f64cf9b5d0226fd097c0593df563d5be

let overrides = {=}

let additions =
      { common = ../common/spago.dhall as Location
      , node-jwt =
        { repo = "https://github.com/Unisay/purescript-node-jwt.git"
        , version = "0.15"
        , dependencies =
          [ "aff"
          , "aff-promise"
          , "bifunctors"
          , "contravariant"
          , "control"
          , "datetime"
          , "effect"
          , "either"
          , "foldable-traversable"
          , "foreign"
          , "foreign-generic"
          , "functions"
          , "integers"
          , "lists"
          , "maybe"
          , "newtype"
          , "now"
          , "options"
          , "prelude"
          , "record"
          , "transformers"
          ]
        }
      , foreign-generic =
        { repo =
            "https://github.com/working-group-purescript-es/purescript-foreign-generic.git"
        , version = "v0.15.0-updates"
        , dependencies = [ "effect", "foreign", "foreign-object" ]
        }
      , node-sqlite3 =
        { repo = "https://github.com/justinwoo/purescript-node-sqlite3.git"
        , version = "v8.0.0"
        , dependencies = [ "aff", "foreign" ]
        }
      , express =
        { repo = "https://github.com/Unisay/purescript-express.git"
        , version = "master"
        , dependencies =
          [ "aff"
          , "arrays"
          , "effect"
          , "either"
          , "exceptions"
          , "foreign"
          , "foreign-generic"
          , "foreign-object"
          , "functions"
          , "maybe"
          , "node-http"
          , "prelude"
          , "psci-support"
          , "strings"
          , "test-unit"
          , "transformers"
          , "unsafe-coerce"
          ]
        }
      }

in  overrides // upstream // additions
