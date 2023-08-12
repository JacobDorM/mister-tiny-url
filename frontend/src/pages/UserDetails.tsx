import { useParams } from 'react-router-dom'
import { userService } from '../services/userService'
import { UserChat } from '../components/user/UserChat'
import { useQuery } from 'react-query'

export const UserDetails: React.FC<{}> = () => {
  const params = useParams()

  const { isLoading, data: user } = useQuery(['user', params.id], () => userService.getById(params.id), {
    enabled: Boolean(params.id),
    cacheTime: 0,
    staleTime: Infinity,
  })

  if (isLoading || !user) return <div>Loading...</div>
  return (
    <div className="chat-room">
      <div>{user.name}</div>
      <UserChat userId={user._id} />
    </div>
  )
}
