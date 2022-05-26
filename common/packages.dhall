let upstream =
      https://github.com/purescript/package-sets/releases/download/psc-0.15.0-20220510/packages.dhall
        sha256:0b0d4db1f2f0acd3b37fa53220644ac6f64cf9b5d0226fd097c0593df563d5be

let overrides = {=}

let additions =
      { foreign-generic =
        { repo = "https://github.com/working-group-purescript-es/purescript-foreign-generic.git"
        , version = "v0.15.0-updates"
        , dependencies = [ "effect", "foreign", "foreign-object" ]
        }
      }

in  overrides // upstream // additions
