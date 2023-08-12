import { Room } from '../../../types'
import { RoomPreview } from '../roomPreview/RoomPreview'

type RoomListProps = {
  rooms: Room[]
  onRemoveRoom: (roomId: string) => void
}

export const RoomList: React.FC<RoomListProps> = ({ rooms, onRemoveRoom }) => {

  // Todo: it should be in the backend and frontend too.
  // Info: Check if the 'rooms' prop is not an array or is empty
  if (!Array.isArray(rooms) || rooms.length === 0) {
    return <div>No rooms available</div>;
  }
// Todo: implement unit testing for that
  const { validRooms, invalidRooms } = rooms.reduce(
    (acc: { validRooms: Room[]; invalidRooms: Room[]; uniqueRoomIds: Set<string> }, room) => {
      // Check if the room has all the required properties (_id, name, msgs)
      if (room._id && room.name && Array.isArray(room.msgs)) {
        // Check if the room's _id is unique
        if (!acc.uniqueRoomIds.has(room._id)) {
          acc.uniqueRoomIds.add(room._id);
          acc.validRooms.push(room);
        } else {
          acc.invalidRooms.push(room);
        }
      } else {
        acc.invalidRooms.push(room);
      }
      return acc;
    },
    { validRooms: [], invalidRooms: [], uniqueRoomIds: new Set<string>() }
  );

  invalidRooms.map(invalidRoom => {
    // Todo: add a logger for invalidRoom
    console.log("invalidRoom", invalidRoom)
  })


  return (
    <div className="user-list simple-cards-grid" role="room-list">
      {validRooms.map((validRoom) => (
        <RoomPreview key={validRoom._id} room={validRoom} onRemoveRoom={onRemoveRoom} />
      ))}
    </div>)
}
