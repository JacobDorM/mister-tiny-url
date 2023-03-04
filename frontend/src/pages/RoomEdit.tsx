import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useFormInput } from '../customHooks'
import { Msg } from '../models'
import { roomService } from '../services/roomService'
import { saveRoom } from '../store/actions/roomActions'
import { useQuery } from 'react-query'
// import { useMutation } from 'react-query'

type useFormInputType = {
  _id: string
  name: string
  msgs: Msg[]
}

export const RoomEdit: React.FC<{}> = () => {
  const [roomInputAtr, room, setRoom] = useFormInput<useFormInputType>({ _id: '', name: '', msgs: [] }, () => {})
  const params = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const getRoomById = async (roomId?: string) => {
    return roomId ? await roomService.getById(roomId) : roomService.getEmptyRoom()
  }

  const { isLoading, data } = useQuery(['room', params.id], () => getRoomById(params.id), {
    enabled: Boolean(params.id),
  })

  // const mutateSaveRoom = useMutation(roomService.save, {
  //   onSuccess: () => {
  //     navigate('/chat')
  //   },
  // })

  const onSaveRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(saveRoom({ ...room }))
    navigate('/chat')
  }

  // const onSaveRoom = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   mutateSaveRoom.mutate({ ...room })
  // }

  useEffect(() => {
    if (data) {
      setRoom(data)
    }
  }, [data, setRoom])

  if (isLoading) return <div>Loading...</div>
  return (
    <section className="room-edit">
      <h1>{room._id ? 'Edit' : 'Add'} Room</h1>
      <form onSubmit={onSaveRoom}>
        <label htmlFor="name">Name</label>
        <input {...roomInputAtr('name')} type="text" />

        <button>Save</button>
      </form>
    </section>
  )
}
