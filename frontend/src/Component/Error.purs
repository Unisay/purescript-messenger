module Component.Error where

import Prelude

import Effect.Aff.Class (class MonadAff)
import Halogen as H
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties.Extended as HP

component ∷ ∀ q i o m. MonadAff m ⇒ H.Component q i o m
component = H.mkComponent
  { render
  , initialState: const unit
  , eval: H.mkEval $ H.defaultEval
  }

render ∷ ∀ m. Unit → H.ComponentHTML Void () m
render _ = HH.div
  [ HP.classNames
      [ "flex"
      , "flex-col"
      , "items-center"
      , "justify-center"
      , "min-h-screen"
      , "bg-gray-100"
      ]
  ]
  [ HH.div_ [ HH.text "Oh noes!" ]
  , HH.div_
      [ HH.text
          """
          The application is unable to serve your request at this time
          because of an unexpected error.
          You might try repeating your request later.
          """
      ]
  ]
