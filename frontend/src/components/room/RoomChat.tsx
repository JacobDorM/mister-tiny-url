import { useState, useEffect, useRef, useCallback } from 'react'
import { useFormInput, useAppSelector } from '../../hooks'
import { Msg } from '../../types'
import { socketService, SOCKET_USER_TYPING } from '../../services/socketServiceClass'
import { MsgList } from '../../components/msg/MsgList'
import { utilService } from '../../services/utilService'
import { SOCKET_EMIT_ROOM_CHAT_SEND_MSG, SOCKET_EMIT_SET_TOPIC } from '../../constants/socket/emit'
import { SOCKET_EVENT_ROOM_CHAT_ADD_MSG } from '../../constants/socket/event'

interface RoomChatProps {
  roomId: string
  msgHistory: Msg[] | []
}

export const RoomChat: React.FC<RoomChatProps> = ({ msgHistory, roomId }) => {
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [typingUser, setTypingUser] = useState<string>()
  const bounce: React.MutableRefObject<Function> = useRef(() => { })
  const { loggedinUser } = useAppSelector((state) => state.authModule)

  const [msgInputAtr, msg, setMsg] = useFormInput({ _id: utilService.makeId(), txt: '', byUser: loggedinUser?._id }, () => {
    socketService.emit(SOCKET_USER_TYPING, loggedinUser?.name || 'Guest')
    bounce.current()
  })

  useEffect(() => {
    socketService.emit(SOCKET_EMIT_SET_TOPIC, roomId)
    socketService.on(SOCKET_EVENT_ROOM_CHAT_ADD_MSG, (msg: Msg) => setMsgs(prevMsgs => [...prevMsgs, msg]))
    socketService.on(SOCKET_USER_TYPING, (username: string) => setTypingUser(username))
    bounce.current = utilService.debounce(() => socketService.emit(SOCKET_USER_TYPING, null))
    return () => {
      socketService.off(SOCKET_EVENT_ROOM_CHAT_ADD_MSG)
      socketService.off(SOCKET_USER_TYPING)
    }
  }, [roomId])

  const sendMsg = useCallback(() => {
    socketService.emit(SOCKET_EMIT_ROOM_CHAT_SEND_MSG, msg)
    setMsg({ _id: utilService.makeId(), txt: '', byUser: loggedinUser?._id })
  }, [msg, loggedinUser, setMsg])

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
