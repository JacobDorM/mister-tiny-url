import { Room } from '../types'
import { HttpService } from './httpServiceClass'

const ENDPOINT = 'room'
const httpService = new HttpService()
export const roomService = {
  getRooms,
  getById,
  save,
  getEmptyRoom,
  remove,
}

async function getRooms() {
  return httpService.get<Room[]>(ENDPOINT)
}

async function getById(roomId?: string) {
  return httpService.get<Room>(`${ENDPOINT}/${roomId}`)
}

async function save(room: Room) {
  return room._id ? httpService.put<Room>(ENDPOINT, room) : httpService.post<Room>(ENDPOINT, room)
}

function remove(roomId: string) {
  return httpService.delete<Room>(`${ENDPOINT}/${roomId}`)
}

function getEmptyRoom(): Room {
  return {
    _id: '',
    name: '',
    msgs: [],
  }
}
