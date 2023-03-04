import { useState, useEffect, useRef } from 'react'
import { useFormInput, useAppSelector } from '../../customHooks'
import { Msg } from '../../models'
import { socketService, SOCKET_EMIT_ROOM_CHAT_SEND_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_ROOM_CHAT_ADD_MSG, SOCKET_USER_TYPING } from '../../services/socketService'
import { MsgList } from '../../cmps/msg/MsgList'
import { utilService } from '../../services/utilService'

type RoomChatProps = {
  roomId: string
  msgHistory: Msg[] | []
}

export const RoomChat: React.FC<RoomChatProps> = ({ msgHistory, roomId }) => {
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [typingUser, setTypingUser] = useState<string>()
  const bounce: React.MutableRefObject<Function> = useRef(() => {})
  const { loggedinUser } = useAppSelector((state) => state.authModule)

  const [msgInputAtr, msg, setMsg] = useFormInput({ _id: utilService.makeId(), txt: '', byUser: loggedinUser?._id }, () => {
    socketService.emit(SOCKET_USER_TYPING, loggedinUser?.name || 'Guest')
    bounce.current()
  })

  useEffect(() => {
    socketService.emit(SOCKET_EMIT_SET_TOPIC, roomId)
    socketService.on(SOCKET_EVENT_ROOM_CHAT_ADD_MSG, (msg: Msg) => setMsgs([...msgs, msg]))
    socketService.on(SOCKET_USER_TYPING, (username: string) => setTypingUser(username))
    bounce.current = utilService.debounce(() => socketService.emit(SOCKET_USER_TYPING, null))
    return () => {
      socketService.off(SOCKET_EVENT_ROOM_CHAT_ADD_MSG)
      socketService.off(SOCKET_USER_TYPING)
    }
  }, [roomId, msgs])

  const sendMsg = () => {
    socketService.emit(SOCKET_EMIT_ROOM_CHAT_SEND_MSG, msg)
    setMsg({ _id: utilService.makeId(), txt: '', byUser: loggedinUser?._id })
  }

  return (
    <div className="chat-room">
      <MsgList msgs={[...msgHistory, ...msgs]} />
      <div>
        {typingUser ? <div>{typingUser} is typing...</div> : ''}
        <input {...msgInputAtr('txt')} type="text" placeholder="write your mmessage" className="" />
        <button onClick={sendMsg}>Send</button>
      </div>
    </div>
  )
}
