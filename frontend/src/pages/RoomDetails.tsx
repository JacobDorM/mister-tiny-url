import { useParams } from 'react-router-dom'
import { roomService } from '../services/roomService'
import { RoomChat } from '../cmps/room/RoomChat'
import { useQuery } from 'react-query'

export const RoomDetails: React.FC<{}> = () => {
  const params = useParams()

  const { isLoading, data: room } = useQuery(['room', params.id], () => roomService.getById(params.id), {
    enabled: Boolean(params.id),
    cacheTime: 0,
    staleTime: Infinity,
  })

  if (isLoading || !room) return <div>Loading...</div>
  return (
    <div>
      <div>{room.name}</div>
      <RoomChat msgHistory={room.msgs || []} roomId={room._id} />
    </div>
  )
}
