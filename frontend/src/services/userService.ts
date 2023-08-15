import { User } from '../types'
import { HttpService } from './httpService'

const ENDPOINT = 'user'
const httpService = new HttpService()
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
