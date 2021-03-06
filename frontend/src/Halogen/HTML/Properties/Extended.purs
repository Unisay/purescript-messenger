module Halogen.HTML.Properties.Extended
  ( module HP
  , classNames
  ) where

import Preamble

import Halogen (ClassName(..))
import Halogen.HTML.Properties
  ( AutocompleteType(..)
  , ButtonType(..)
  , CSSPixel
  , FormMethod(..)
  , IProp(..)
  , InputAcceptType(..)
  , InputType(..)
  , MenuType(..)
  , MenuitemType(..)
  , OrderedListType(..)
  , PreloadValue(..)
  , ScopeValue(..)
  , StepValue(..)
  , accept
  , action
  , alt
  , attr
  , attrNS
  , autocomplete
  , autofocus
  , autoplay
  , charset
  , checked
  , class_
  , classes
  , colSpan
  , cols
  , controls
  , disabled
  , download
  , draggable
  , enabled
  , enctype
  , expand
  , for
  , height
  , href
  , id
  , list
  , loop
  , max
  , method
  , min
  , multiple
  , muted
  , name
  , noValidate
  , pattern
  , placeholder
  , poster
  , preload
  , prop
  , readOnly
  , ref
  , rel
  , required
  , rowSpan
  , rows
  , scope
  , selected
  , selectedIndex
  , spellcheck
  , src
  , srcDoc
  , step
  , style
  , tabIndex
  , target
  , title
  , type_
  , value
  , width
  ) as HP

classNames ∷ ∀ r i. Array String → HP.IProp (class ∷ String | r) i
classNames = HP.classes <<< map ClassName
