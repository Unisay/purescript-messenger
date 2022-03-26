let upstream =
      https://github.com/purescript/package-sets/releases/download/psc-0.14.5-20220216/packages.dhall
        sha256:890466a5e3ed4793ee702d8df8ef85a025fbacbdfeb63c73597aef2795c06845

let overrides = {=}

let additions =
      { svg-parser =
        { repo = "https://github.com/rnons/purescript-svg-parser.git"
        , version = "v2.0.0"
        , dependencies = [ "prelude", "string-parsers" ]
        }
      , svg-parser-halogen =
        { repo = "https://github.com/rnons/purescript-svg-parser-halogen.git"
        , version = "v2.0.0"
        , dependencies = [ "prelude", "halogen", "svg-parser" ]
        }
      }

in  (overrides // upstream // additions)
  with common = ../common/spago.dhall as Location
