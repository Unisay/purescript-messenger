module Data.Notification where

import Prelude

data Importance = Useful | Important | Critical

data Notification = Notification Importance String

instance Show Notification where
  show (Notification importance message) =
    "[" <> renderImportanceLog importance <> "] " <> message
    where
    renderImportanceLog = case _ of
      Useful → "USEFL"
      Important → "IMPRT"
      Critical → "CRITL"

useful ∷ String → Notification
useful = Notification Useful

important ∷ String → Notification
important = Notification Important

critical ∷ String → Notification
critical = Notification Critical
