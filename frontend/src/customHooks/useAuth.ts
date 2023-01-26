import { useOutletContext } from 'react-router-dom'
import { UserCred } from '../models'

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
      name?: string
      email: string
      password: string
    }>
  >
}

export const useAuth = () => {
  return useOutletContext<AuthContextType>()
}
