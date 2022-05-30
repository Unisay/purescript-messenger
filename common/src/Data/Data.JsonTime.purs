module Data.JsonTime
  ( EncodeDateTime(..)
  ) where

import Preamble

import Data.Argonaut.Encode (class EncodeJson, encodeJson)
import Data.Date (Date, day, month, year)
import Data.Date.Component (Month(..))
import Data.Enum (fromEnum)
import Data.Time (Time, hour, minute, second)

data EncodeDateTime = DateTime Date Time

instance EncodeJson EncodeDateTime where
  encodeJson (DateTime date time) = encodeJson
    { date: (show (fromEnum $ year date))
        <> "/"
        <> showMonth (month date)
        <> "/"
        <> show (fromEnum $ day date)
    , time: (show $ fromEnum $ second time)
        <> ":"
        <> (show $ fromEnum $ minute time)
        <> ":"
        <> (show $ fromEnum $ hour time)
    }

showMonth ∷ Month → String
showMonth = case _ of
  January → "01"
  February → "02"
  March → "03"
  April → "04"
  May → "05"
  June → "06"
  July → "07"
  August → "08"
  September → "09"
  October → "10"
  November → "11"
  December → "12"
