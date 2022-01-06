let upstream =
      https://github.com/purescript/package-sets/releases/download/psc-0.14.5-20211116/packages.dhall sha256:7ba810597a275e43c83411d2ab0d4b3c54d0b551436f4b1632e9ff3eb62e327a

let overrides = {=}

let additions =
      { common = ../common/spago.dhall as Location
      , node-jwt =
        { dependencies =
          [ "effect"
          , "console"
          , "options"
          , "prelude"
          , "newtype"
          , "foreign-generic"
          , "aff"
          , "aff-promise"
          , "psci-support"
          ]
        , repo = "https://github.com/gaku-sei/purescript-node-jwt.git"
        , version = "master"
        }
      }

in  overrides // upstream // additions
