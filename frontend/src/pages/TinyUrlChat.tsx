import { Link } from 'react-router-dom'
import { RoomApp } from '../components/room/RoomApp'
import { UserApp } from '../components/user/UserApp'

export const TinyUrlChat: React.FC<{}> = () => {
  return (
    <div className="tiny-url-chat">
      <Link to="/room/edit">Add Room</Link>
      <UserApp />
      <RoomApp />
    </div>
  )
}
