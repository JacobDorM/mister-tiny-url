import { useEffect, useCallback } from 'react'
import { RoomList } from './RoomList'
import { useAppSelector, useAppDispatch } from '../../customHooks'
import { loadRooms, removeRoom, saveRoom } from '../../store/actions/roomActions'
import { socketService, SOCKET_EVENT_DELETE_ROOM, SOCKET_EVENT_SAVE_ROOM } from '../../services/socketService'
import { Room } from '../../models'

export const RoomApp: React.FC<{}> = () => {
  let { rooms } = useAppSelector((state) => state.roomModule)
  const dispatch = useAppDispatch()

  const storeRoom = useCallback(
    (room: Room) => {
      dispatch(saveRoom(room, true))
    },
    [dispatch]
  )

  const deleteRoom = useCallback(
    (roomId: string) => {
      dispatch(removeRoom(roomId, true))
    },
    [dispatch]
  )

  const onRemoveRoom = (roomId: string) => {
    dispatch(removeRoom(roomId))
  }

  useEffect(() => {
    dispatch(loadRooms())
    socketService.on(SOCKET_EVENT_SAVE_ROOM, storeRoom)
    socketService.on(SOCKET_EVENT_DELETE_ROOM, deleteRoom)
    return () => {
      socketService.off(SOCKET_EVENT_SAVE_ROOM)
      socketService.off(SOCKET_EVENT_DELETE_ROOM)
    }
  }, [dispatch, storeRoom, deleteRoom])

  if (!rooms[0]) return <div>Loading...</div>
  return (
    <div className="tiny-url-chat">
      <RoomList rooms={rooms} onRemoveRoom={onRemoveRoom} />
    </div>
  )
}
