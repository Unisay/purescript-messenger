module Data.Notification where

import Prelude

import Data.Bounded.Generic (genericBottom, genericTop)
import Data.Enum (class BoundedEnum, class Enum)
import Data.Enum.Generic
  ( genericCardinality
  , genericFromEnum
  , genericPred
  , genericSucc
  , genericToEnum
  )
import Data.Generic.Rep (class Generic)
import Data.Show.Generic (genericShow)

data Importance = Useful | Important | Critical

derive instance Eq Importance
derive instance Ord Importance
derive instance Generic Importance _
instance Show Importance where
  show = genericShow

instance Enum Importance where
  succ = genericSucc
  pred = genericPred

instance Bounded Importance where
  top = genericTop
  bottom = genericBottom

instance BoundedEnum Importance where
  cardinality = genericCardinality
  toEnum = genericToEnum
  fromEnum = genericFromEnum

data Notification = Notification Importance String

derive instance Eq Notification

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
