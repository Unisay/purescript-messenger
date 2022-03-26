module Component.NotificationsSpec where

import Prelude

import Component.Notifications (Action(..), evalSpec, initialState)
import Control.Monad.State.Class (gets)
import Data.Notification (critical, important, useful)
import Data.Traversable (traverse_)
import Effect.Aff.Class (class MonadAff, liftAff)
import Effect.Class (liftEffect)
import Halogen.Driver (runComponent)
import Halogen.Subscription as Subscription
import Test.Unit (TestSuite, test)
import Test.Unit.Assert (shouldEqual)

spec ∷ TestSuite
spec = test "Notifications" do
  { emitter, listener } ← liftEffect Subscription.create
  let sendNotification = liftEffect <<< Subscription.notify listener

  runComponent (initialState emitter) evalSpec \simulateAction → do
    traverse_ sendNotification [ useful "u", important "i", critical "c" ]
    simulateAction $ Close 1
    gets _.queue >>= shouldBe [ critical "c", useful "u" ]
    simulateAction $ Close 0
    gets _.queue >>= shouldBe [ useful "u" ]
    simulateAction $ Close 0
    gets _.queue >>= shouldBe []

shouldBe ∷ ∀ a m. MonadAff m ⇒ Eq a ⇒ Show a ⇒ a → a → m Unit
shouldBe l r = liftAff $ shouldEqual r l
