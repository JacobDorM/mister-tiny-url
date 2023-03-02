import { useEffect } from 'react'
import { UserList } from './UserList'
import { useAppSelector, useAppDispatch } from '../../customHooks'
import { loadUsers } from '../../store/actions/userActions'

export const UserApp: React.FC<{}> = () => {
  let { users } = useAppSelector((state) => state.userModule)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadUsers())
  }, [dispatch])

  if (!users) return <div>Loading...</div>
  return (
    <div className="tiny-url-chat">
      <UserList users={users} />
    </div>
  )
}
