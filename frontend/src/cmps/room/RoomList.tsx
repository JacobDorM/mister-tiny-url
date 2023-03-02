import { Room } from '../../models'
import { RoomPreview } from './RoomPreview'
type RoomListProps = {
  rooms: Room[]
  onRemoveRoom: (roomId: string) => void
}

export const RoomList: React.FC<RoomListProps> = ({ rooms, onRemoveRoom }) => {
  return (
    <div className="user-list simple-cards-grid">
      {rooms.map((room) => (
        <RoomPreview key={room._id} room={room} onRemoveRoom={onRemoveRoom} />
      ))}
    </div>
  )
}
