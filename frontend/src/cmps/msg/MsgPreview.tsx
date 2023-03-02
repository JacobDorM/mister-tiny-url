import { useCallback, useEffect, useState } from 'react'
import { Msg, UserCred } from '../../models'
import { userService } from '../../services/userService'

type MsgPreviewProps = {
  msg: Msg
}

export const MsgPreview: React.FC<MsgPreviewProps> = ({ msg }) => {
  const [user, setUser] = useState<UserCred>()

  const loadUser = useCallback(async () => {
    const user = await userService.getById(msg.byUser)
    setUser(user)
  }, [msg.byUser])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  if (!user) return <div>loading...</div>
  return (
    <div className="Msg">
      {/* user msg */}
      <div></div>
      {/* my msg */}
      <div>
        {user.name} : {msg.txt}
      </div>
    </div>
  )
}
