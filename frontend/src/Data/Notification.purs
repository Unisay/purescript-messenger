module Data.Notification where

data Importance = Useful | Important | Critical

data Notification = Notification Importance String

useful ∷ String → Notification
useful = Notification Useful

important ∷ String → Notification
important = Notification Important

critical ∷ String → Notification
critical = Notification Critical
