module Main where

import Prelude
import Data.Array (length)
import Data.Array as Array
import Data.Either (Either(..))
import Effect (Effect)
import Effect.Aff (Aff, launchAff_, throwError)
import Effect.Class.Console (log)
import Effect.Exception (error)
import Node.Encoding as Encoding
import Node.FS.Aff as FS
import Node.Path (FilePath)
import Options.Applicative ((<**>))
import Options.Applicative as Opt
import Parser as Parser
import Printer (printModule)
import Text.Parsing.Parser (parseErrorMessage, runParser)

type Options
  = { input :: FilePath
    , output :: FilePath
    }

options :: Opt.Parser Options
options = ado
  input <-
    Opt.strOption <<< Array.fold
      $ [ Opt.long "input"
        , Opt.short 'i'
        , Opt.metavar "INPUT_FILE"
        , Opt.help "Input file (tailwind.css)"
        ]
  output <-
    Opt.strOption <<< Array.fold
      $ [ Opt.long "output"
        , Opt.short 'o'
        , Opt.metavar "OUTPUT_FILE"
        , Opt.help "Output file (Tailwind.purs)"
        ]
  in { input, output }

main :: Effect Unit
main = Opt.execParser opts >>= useOptions
  where
  opts =
    Opt.info (options <**> Opt.helper)
      ( Opt.fullDesc
          <> Opt.progDesc
              "Parses Tailwind CSS file (INPUT_FILE)\
            \ and generates PureScript module (OUTPUT_FILE)"
          <> Opt.header "Tailwind CSS parser/codegenerator"
      )

useOptions :: Options -> Effect Unit
useOptions { input, output } =
  launchAff_ do
    css <- FS.readTextFile Encoding.UTF8 input
    classNames <- extractClassNames css
    FS.writeTextFile Encoding.UTF8 output (printModule classNames)

extractClassNames :: String -> Aff (Array String)
extractClassNames css = case Array.nub <<< Array.sort <$> runParser css Parser.classNames of
  Left e -> (throwError <<< error <<< parseErrorMessage) e
  Right classNames -> do
    log $ "Extracted " <> show (length classNames) <> " classes."
    pure classNames
