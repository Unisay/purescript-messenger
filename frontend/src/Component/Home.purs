module Component.Home where

import Prelude

import Halogen as H
import Halogen.HTML as HH

type State = Unit

component :: forall query input output m. H.Component query input output m
component =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval H.defaultEval
    }

initialState :: forall input. input -> State
initialState _input = unit

render :: forall m action. State -> H.ComponentHTML action () m
render _state = HH.text "Home sweet home"
