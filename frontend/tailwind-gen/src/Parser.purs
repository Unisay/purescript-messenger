module Parser where

import Prelude
import Control.Alt ((<|>))
import Control.Lazy (defer)
import Data.Array ((:))
import Data.Array as Array
import Data.Identity (Identity)
import Data.Maybe (Maybe(..))
import Text.Parsing.Parser (Parser)
import Text.Parsing.Parser.Combinators (asErrorMessage, optional, (<?>))
import Text.Parsing.Parser.Language (emptyDef)
import Text.Parsing.Parser.String (char, eof, oneOf, satisfy, string)
import Text.Parsing.Parser.Token (GenLanguageDef(..), TokenParser, alphaNum, letter, makeTokenParser, unGenLanguageDef)

type Parse
  = Parser String

classNames :: Parse (Array String)
classNames =
  lang.whiteSpace
    *> (Array.concat <$> Array.many (ruleParser <|> media) <* lang.whiteSpace)
    <* eof

ruleParser :: Parse (Array String)
ruleParser = selectors <* block <* lang.whiteSpace

media :: Parse (Array String)
media = lang.lexeme (string "@media") *> argsParser *> rules <* lang.whiteSpace
  where
  rules :: Parse (Array String)
  rules = Array.concat <$> lang.braces (Array.many ruleParser)

  argsParser =
    asErrorMessage "arguments" <<< lang.parens
      $ Array.many (satisfy (_ /= ')'))

selectors :: Parse (Array String)
selectors = Array.concat <<< Array.fromFoldable <$> lang.commaSep selector

block :: Parse Unit
block =
  asErrorMessage "block" <<< lang.braces <<< void
    $ Array.many (satisfy (_ /= '}'))

selector :: Parse (Array String)
selector =
  map Array.concat ado
    s <- Array.fromFoldable <$> simpleSelector
    ss <- Array.many (operator *> defer (\_ -> selector))
    in s : ss

operator :: Parse Unit
operator = void $ lang.lexeme (char '>' <|> char '+')

simpleSelector :: Parse (Maybe String)
simpleSelector = class_ <|> universal <|> element <|> attributeSpec
  where
  class_ = Just <$> (char '.' *> cssIdent) <?> "class selector"

  element =
    Nothing
      <$ (void cssIdent <* optional attributeSpec <* optional pseudo)
      <?> "element selector"

  attributeSpec = Nothing <$ lang.brackets inside <?> "attributes spec"
    where
    inside = void $ Array.many (satisfy (_ /= ']'))

  -- https://www.w3.org/TR/selectors/#the-universal-selector
  universal = Nothing <$ ((lang.lexeme (string "*")) <?> "universal selector")

  pseudo =
    Nothing
      <$ asErrorMessage "pseudo element selector"
          (char ':' *> optional (char ':') *> cssIdent)

cssIdent :: Parse String
cssIdent = lang.identifier

lang :: TokenParser
lang = makeTokenParser cssStyle

cssStyle :: GenLanguageDef String Identity
cssStyle =
  LanguageDef
    (unGenLanguageDef emptyDef)
      { commentStart = "/*"
      , commentEnd = "*/"
      , commentLine = "//"
      , nestedComments = true
      , identStart = letter <|> oneOf [ '-', '_' ]
      , identLetter = alphaNum <|> oneOf [ '-', '_', '$' ]
      , caseSensitive = false
      }
