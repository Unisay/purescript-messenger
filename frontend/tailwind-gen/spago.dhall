{ name = "my-project"
, dependencies =
  [ "aff"
  , "arrays"
  , "console"
  , "control"
  , "debug"
  , "effect"
  , "either"
  , "exceptions"
  , "identity"
  , "maybe"
  , "node-buffer"
  , "node-fs-aff"
  , "node-path"
  , "optparse"
  , "parsing"
  , "prelude"
  , "psci-support"
  , "strings"
  , "strings-extra"
  ]
, packages = ../../packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
