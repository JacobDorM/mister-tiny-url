import { useOutletContext } from 'react-router-dom'
import { Msg, UserCred } from '../models'

type AuthContextType = {
  userCred: UserCred
  authInputAtr: (field: string) => {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    name: string
    id: string
    value: any
  }

  setUserCred: React.Dispatch<
    React.SetStateAction<{
      _id?: string
      name?: string
      email: string
      password: string
      msgs?: Msg[] | []
    }>
  >
}

export const useAuth = () => {
  return useOutletContext<AuthContextType>()
}
