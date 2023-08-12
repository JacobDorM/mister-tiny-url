import { Msg } from '../../types'
import { MsgPreview } from './MsgPreview'

type MsgListProps = {
  msgs: Msg[]
}

export const MsgList: React.FC<MsgListProps> = ({ msgs }) => {
  return (
    <div className="msg-list simple-cards-grid">
      {msgs.map((msg) => (
        <MsgPreview key={msg._id} msg={msg} />
      ))}
    </div>
  )
}
