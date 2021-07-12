module Main where

import Prelude
import Data.Array (length)
import Data.Array as Array
import Data.Either (Either(..))
import Data.Function (on)
import Data.String.Extra (camelCase)
import Data.Tuple (Tuple(..), fst)
import Effect (Effect)
import Effect.Aff (Aff, launchAff_)
import Effect.Class.Console (log)
import Node.Encoding as Encoding
import Node.FS.Aff as FS
import Node.Path (FilePath)
import Options.Applicative ((<**>))
import Options.Applicative as Opt
import Parser as Parser
import Printer (printModule)
import Text.Parsing.Parser (ParseError, parseErrorMessage, parseErrorPosition, runParser)
import Text.Parsing.Parser.Pos (Position(..))

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

extractClassNames :: String -> Aff (Array (Tuple String String))
extractClassNames css = case f <$> res of
  Left e -> do
    let
      Position { column, line } = parseErrorPosition e
    log
      $ Array.fold
          [ "Parse error at "
          , show line
          , ":"
          , show column
          , " "
          , parseErrorMessage e
          ]
    pure []
  Right classNames ->
    log ("Extracted " <> show (length classNames) <> " classes.")
      $> classNames
  where
  res :: Either ParseError (Array String)
  res = runParser css Parser.classNames

  f :: Array String -> Array (Tuple String String)
  f ss = Array.nubBy (compare `on` fst) (map toTuple (Array.sort ss))

  toTuple :: String -> Tuple String String
  toTuple s = Tuple (camelCase s) s
