import { Msg, UserCred } from '../../models'
import { userService } from '../../services/userService'
import { useQuery } from 'react-query'

type MsgPreviewProps = {
  msg: Msg
}

export const MsgPreview: React.FC<MsgPreviewProps> = ({ msg }) => {
  const { isLoading, data: user, error } = useQuery<UserCred, { message: string; status: number }>(['user', msg.byUser], () => userService.getById(msg.byUser))

  if (isLoading || !user) return <div>loading...</div>
  if (error) return <div>Error: {error.message} of Status:{error.status}</div>

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
