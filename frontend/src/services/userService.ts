import { User } from '../types'
import { httpService } from './httpService'

const ENDPOINT = 'user'

export const userService = {
  getUsers,
  getById,
}

async function getUsers() {
  return httpService.get<User[]>(ENDPOINT)
}

async function getById(userId?: string) {
  return httpService.get<User>(`${ENDPOINT}/${userId}`)
}
