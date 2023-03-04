import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useFormInput, useAppSelector, useForm } from '../customHooks'
import { UserCred, Msg } from '../models'
import { userService } from '../services/userService'
import { socketService, SOCKET_EMIT_SEND_PRIVATE_MSG, SOCKET_EMIT_SET_RECIPIENT, SOCKET_EVENT_USER_CHAT_ADD_MSG, SOCKET_PRIVATE_USER_TYPING } from '../services/socketService'
import { MsgList } from '../cmps/msg/MsgList'
import { utilService } from '../services/utilService'
import { useQuery } from 'react-query'

export const ChatUser: React.FC<{}> = () => {
  const params = useParams()
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [user, , setUser] = useForm<UserCred>({ _id: '', name: '', email: '', password: '', msgs: [] }, () => {
    socketService.emit(SOCKET_EMIT_SET_RECIPIENT, user._id)
    setMsg({ ...msg, toUser: user._id })
  })
  const [typingUser, setTypingUser] = useState<string>()
  const bounce: React.MutableRefObject<Function> = useRef(() => {})
  const { loggedinUser } = useAppSelector((state) => state.authModule)

  const [msgInputAtr, msg, setMsg] = useFormInput({ _id: utilService.makeId(), txt: '', byUser: loggedinUser?._id, toUser: user?._id }, () => {
    socketService.emit(SOCKET_PRIVATE_USER_TYPING, loggedinUser?.name || 'Guest')
    bounce.current()
  })

  // const getUserById = async (userId?: string) => await userService.getById(userId)

  const { isLoading, data } = useQuery(['user', params.id], async () => await userService.getById(params.id), {
    enabled: Boolean(params.id),
  })

  useEffect(() => {
    if (data) {
      setUser(data)
    }
    socketService.on(SOCKET_EVENT_USER_CHAT_ADD_MSG, (msg: Msg) => setMsgs([...msgs, msg]))
    socketService.on(SOCKET_PRIVATE_USER_TYPING, (username: string) => {
      setTypingUser(username)
    })
    bounce.current = utilService.debounce(() => socketService.emit(SOCKET_PRIVATE_USER_TYPING, null))
    return () => {
      socketService.off(SOCKET_EVENT_USER_CHAT_ADD_MSG)
      socketService.off(SOCKET_PRIVATE_USER_TYPING)
    }
  }, [data, msgs, setUser])

  const sendMsg = () => {
    socketService.emit(SOCKET_EMIT_SEND_PRIVATE_MSG, msg)
    setMsg({ _id: utilService.makeId(), txt: '', byUser: loggedinUser?._id, toUser: user?._id })
  }

  if (isLoading) return <div>Loading...</div>
  return (
    <div className="chat-room">
      <MsgList msgs={[...user.msgs]} />
      <div>
        {typingUser ? <div>{typingUser} is typing...</div> : ''}
        <input {...msgInputAtr('txt')} type="text" placeholder="write youe mmessage" className="" />
        <button onClick={sendMsg}>Send</button>
      </div>
    </div>
  )
}
