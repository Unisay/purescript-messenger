module Chat where

import Prelude

import Chat.Api.Http (UserPresence)
import Chat.Presence (Presence(..))
import Data.Username (Username)
import Database as Db
import Foreign.Class as Foreign
import ServerM (ServerM, liftDbM)

users :: ServerM (Array UserPresence)
users = liftDbM $ Db.query "SELECT * FROM chat_users" []

enter :: Username -> ServerM Unit
enter username = liftDbM $
  Db.execute
    """
      INSERT OR IGNORE INTO chat_users (username, status)
      VALUES (?, ?)
    """
    [ Foreign.encode username, Foreign.encode Online ]

exit :: Username -> ServerM Unit
exit username = liftDbM $ Db.execute
  "DELETE FROM chat_users WHERE username = ?"
  [ Foreign.encode username ]

