let upstream =
      https://github.com/purescript/package-sets/releases/download/psc-0.15.0-20220510/packages.dhall
        sha256:0b0d4db1f2f0acd3b37fa53220644ac6f64cf9b5d0226fd097c0593df563d5be

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
      }

in  (overrides // upstream // additions)
  with common = ../common/spago.dhall as Location
