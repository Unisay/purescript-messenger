module Parser (classNames) where

import Prelude
import Control.Alt ((<|>))
import Control.Lazy (defer)
import Data.Array ((:))
import Data.Array as Array
import Data.Identity (Identity)
import Data.Maybe (Maybe(..))
import Text.Parsing.Parser (Parser)
import Text.Parsing.Parser.Combinators (asErrorMessage, choice, optional, (<?>))
import Text.Parsing.Parser.Language (emptyDef)
import Text.Parsing.Parser.String (char, eof, oneOf, satisfy, string)
import Text.Parsing.Parser.Token (GenLanguageDef(..), TokenParser, alphaNum, digit, letter, makeTokenParser, unGenLanguageDef)

type Parse
  = Parser String

classNames :: Parse (Array String)
classNames =
  lang.whiteSpace
    *> (Array.concat <$> Array.many (rule <|> atRule) <* lang.whiteSpace)
    <* eof

rule :: Parse (Array String)
rule = selectors <* block <* lang.whiteSpace

atRule :: Parse (Array String)
atRule =
  asErrorMessage "atRule"
    $ lang.lexeme
        ( char '@'
            *> choice
                [ string "media"
                , string "keyframes"
                , string "-webkit-keyframes"
                ]
        )
    *> optional argsParser
    *> optional (lang.lexeme (Array.some alphaNum))
    *> rules
    <* lang.whiteSpace
  where
  rules :: Parse (Array String)
  rules =
    asErrorMessage "rules"
      $ Array.concat
      <$> lang.braces (Array.many (rule <|> defer \_ -> atRule))

argsParser :: Parse Unit
argsParser =
  void <<< asErrorMessage "arguments" <<< lang.parens
    $ Array.many (satisfy (_ /= ')'))

selectors :: Parse (Array String)
selectors =
  Array.concat <<< Array.concat <<< Array.fromFoldable
    <$> lang.commaSep (Array.many selector)

block :: Parse Unit
block =
  asErrorMessage "block" <<< lang.braces <<< void
    $ Array.many (satisfy (_ /= '}'))

selector :: Parse (Array String)
selector =
  asErrorMessage "selector"
    $ map Array.concat ado
        s <- Array.fromFoldable <$> simpleSelector
        ss <- Array.many (operator *> defer (\_ -> selector))
        in s : ss

operator :: Parse Unit
operator =
  asErrorMessage "operator" <<< void
    $ lang.lexeme (oneOf [ '>', '+', '~' ])

simpleSelector :: Parse (Maybe String)
simpleSelector =
  choice
    [ class_
    , universal
    , element
    , attributeSpec
    , pseudo
    , percent
    ]
  where
  class_ =
    Just <$> (char '.' *> cssIdent <* optional attributeSpec <* Array.many pseudo)
      <?> "class selector"

  element =
    Nothing
      <$ (void cssIdent <* optional attributeSpec <* Array.many pseudo)
      <?> "element selector"

  attributeSpec = Nothing <$ lang.brackets inside <?> "attributes spec"
    where
    inside = void $ Array.many (satisfy (_ /= ']'))

  -- https://www.w3.org/TR/selectors/#the-universal-selector
  universal = Nothing <$ ((lang.lexeme (string "*")) <?> "universal selector")

  pseudo =
    Nothing
      <$ asErrorMessage "pseudo element selector"
          (char ':' *> optional (char ':') *> cssIdent <* optional argsParser)

  percent =
    Nothing
      <$ asErrorMessage "percent"
          (lang.lexeme (Array.some lang.integer <* char '%'))

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
      , identStart = letter <|> oneOf [ '-', '_' ] <|> escaped
      , identLetter = alphaNum <|> oneOf [ '-', '_', '$' ] <|> escaped
      , caseSensitive = false
      }

escaped :: Parse Char
escaped = char '\\' *> (oneOf [ ':', '.', '/' ] <|> (Array.some digit $> ' '))
