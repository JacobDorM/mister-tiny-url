import { useEffect, useCallback } from 'react'
import { RoomList } from './roomList/RoomList'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { loadRooms, removeRoom, saveRoom } from '../../store/actions/roomActions'
import { socketService } from '../../services/socketServiceClass'
import { Room } from '../../types'
import { SOCKET_EVENT_DELETE_ROOM, SOCKET_EVENT_SAVE_ROOM } from '../../constants/socket/event'

export const RoomApp: React.FC<{}> = () => {
  let { rooms, isLoading, error } = useAppSelector((state) => state.roomModule)
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

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>something went wrong </div>
  if (!rooms[0]) return <div>rooms are missing...</div>
  return (
    <div className="tiny-url-chat">
      <RoomList rooms={rooms} onRemoveRoom={onRemoveRoom} />
    </div>
  )
}
