import { Link } from 'react-router-dom'
import { Room } from '../../models'
type RoomPreviewProps = {
  room: Room
  onRemoveRoom: (roomId: string) => void
}

export const RoomPreview: React.FC<RoomPreviewProps> = ({ room, onRemoveRoom }) => {
  const roomStyle = { backgroundImage: `url(https://robohash.org/${room._id})` }
  return (
    <div style={roomStyle} className="user-preview">
      <Link to={`/room/chat/${room._id}`} className="info">
        <h2>{room.name}</h2>
      </Link>
      <section className="actions">
        <button onClick={() => onRemoveRoom(room._id)}>Delete</button>
        <Link to={`/room/edit/${room._id}`}>Edit</Link>
      </section>
    </div>
  )
}
