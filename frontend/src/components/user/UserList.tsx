import { useAppSelector } from '../../hooks'
import { UserCred } from '../../types'
import { UserPreview } from './UserPreview'

type UserListProps = {
  users: UserCred[]
}

export const UserList: React.FC<UserListProps> = ({ users }) => {
  const { loggedinUser } = useAppSelector((state) => state.authModule)
  // render all users exept of me.
  users = users.filter((user) => user.email !== loggedinUser?.email)
  return (
    <div className="user-list simple-cards-grid">
      {users.map((user) => (
        <UserPreview key={user._id} user={user} />
      ))}
    </div>
  )
}
