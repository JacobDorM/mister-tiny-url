import { UserCred } from '../models'
import { httpService } from './httpService'

const ENDPOINT = 'user'

export const userService = {
  getUsers,
  getById,
}

async function getUsers() {
  return httpService.get<UserCred[]>(ENDPOINT)
}

async function getById(userId?: string) {
  return httpService.get<UserCred>(`${ENDPOINT}/${userId}`)
}
