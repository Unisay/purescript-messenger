module Component.NotificationsSpec where

import Prelude

import Component.Notifications (Action(..), evalSpec, initialState)
import Control.Monad.State.Class (gets)
import Data.Notification (critical, important, useful)
import Effect.Aff.Class (class MonadAff, liftAff)
import Effect.Class (liftEffect)
import Halogen.Driver (runComponent)
import Halogen.Subscription as Subscription
import Test.Unit (TestSuite, test)
import Test.Unit.Assert (shouldEqual)

spec ∷ TestSuite
spec = test "Notifications" do
  { emitter, listener } ← liftEffect Subscription.create
  let send = liftEffect <<< Subscription.notify listener

  runComponent (initialState emitter) evalSpec \action → do
    send $ useful "u"
    send $ important "i"
    send $ critical "c"
    action $ Close 1
    gets _.queue >>= shouldBe [ critical "c", useful "u" ]
    action $ Close 0
    gets _.queue >>= shouldBe [ useful "u" ]
    action $ Close 0
    gets _.queue >>= shouldBe []

shouldBe ∷ ∀ a m. MonadAff m ⇒ Eq a ⇒ Show a ⇒ a → a → m Unit
shouldBe l r = liftAff $ shouldEqual r l

