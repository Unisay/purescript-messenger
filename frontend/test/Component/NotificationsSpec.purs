module Component.NotificationsSpec where

import Prelude

import Component.Notifications (Action(..), evalSpec, handleAction, initialState)
import Control.Monad.State.Class (gets)
import Control.Monad.State.Trans (runStateT)
import Data.Notification (critical, important, useful)
import Data.Traversable (for_)
import Effect.Aff.Class (class MonadAff, liftAff)
import Effect.Class (liftEffect)
import Halogen.Driver (runHalogenM)
import Halogen.Subscription as Subscription
import Test.Unit (TestSuite, test)
import Test.Unit.Assert (shouldEqual)

spec ∷ TestSuite
spec = test "Notifications" do
  { emitter } ← liftEffect Subscription.create
  void $ flip runStateT (initialState emitter) $ runHalogenM do
    for_ evalSpec.initialize handleAction
    handleAction $ Notify $ useful "u"
    handleAction $ Notify $ important "i"
    handleAction $ Notify $ critical "c"
    handleAction (Close 1)
    gets _.queue >>= shouldBe [ critical "c", useful "u" ]
    handleAction (Close 0)
    gets _.queue >>= shouldBe [ useful "u" ]
    handleAction (Close 0)
    gets _.queue >>= shouldBe []
    for_ evalSpec.finalize handleAction

shouldBe ∷ ∀ a m. MonadAff m ⇒ Eq a ⇒ Show a ⇒ a → a → m Unit
shouldBe l r = liftAff $ shouldEqual r l

