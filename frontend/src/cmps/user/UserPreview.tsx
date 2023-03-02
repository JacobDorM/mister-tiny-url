import { Link } from 'react-router-dom'
import { UserCred } from '../../models'
type UserPreviewProps = {
  user: UserCred
}

export const UserPreview: React.FC<UserPreviewProps> = ({ user }) => {
  const userStyle = { backgroundImage: `url(https://robohash.org/${user._id})` }
  return (
    <div style={userStyle} className="user-preview">
      <Link to={`/user/chat/${user._id}`} className="info">
        <h2>{user.name}</h2>
        <h4>{user.email}</h4>
      </Link>
    </div>
  )
}
