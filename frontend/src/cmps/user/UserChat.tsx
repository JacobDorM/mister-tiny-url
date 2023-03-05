import { useState, useEffect, useRef, useCallback } from 'react'
import { useFormInput, useAppSelector } from '../../customHooks'
import { Msg } from '../../models'
import { socketService, SOCKET_EMIT_SEND_PRIVATE_MSG, SOCKET_EMIT_SET_RECIPIENT, SOCKET_EVENT_USER_CHAT_ADD_MSG, SOCKET_PRIVATE_USER_TYPING } from '../../services/socketService'
import { MsgList } from '../msg/MsgList'
import { utilService } from '../../services/utilService'

interface UserChatProps {
  userId: string
}

export const UserChat: React.FC<UserChatProps> = ({ userId }) => {
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [typingUser, setTypingUser] = useState<string>()
  const bounce: React.MutableRefObject<Function> = useRef(() => { })
  const { loggedinUser } = useAppSelector((state) => state.authModule)

  const [msgInputAtr, msg, setMsg] = useFormInput({ _id: utilService.makeId(), txt: '', byUser: loggedinUser?._id, toUser: userId }, () => {
    socketService.emit(SOCKET_PRIVATE_USER_TYPING, loggedinUser?.name || 'Guest')
    bounce.current()
  })

  useEffect(() => {
    socketService.emit(SOCKET_EMIT_SET_RECIPIENT, userId)
    socketService.on(SOCKET_EVENT_USER_CHAT_ADD_MSG, (msg: Msg) => setMsgs(prevMsgs => [...prevMsgs, msg]))
    socketService.on(SOCKET_PRIVATE_USER_TYPING, (username: string) => {
      setTypingUser(username)
    })
    bounce.current = utilService.debounce(() => socketService.emit(SOCKET_PRIVATE_USER_TYPING, null))
    return () => {
      socketService.off(SOCKET_EVENT_USER_CHAT_ADD_MSG)
      socketService.off(SOCKET_PRIVATE_USER_TYPING)
    }
  }, [userId])

  const sendMsg = useCallback(() => {
    socketService.emit(SOCKET_EMIT_SEND_PRIVATE_MSG, msg)
    setMsg({ _id: utilService.makeId(), txt: '', byUser: loggedinUser?._id, toUser: userId })
  }, [msg, loggedinUser, setMsg, userId])

  return (
    <div className="chat-room">
      <MsgList msgs={[...msgs]} />
      <div>
        {typingUser ? <div>{typingUser} is typing...</div> : ''}
        <input {...msgInputAtr('txt')} type="text" placeholder="write youe mmessage" className="" />
        <button onClick={sendMsg}>Send</button>
      </div>
    </div>
  )
}
