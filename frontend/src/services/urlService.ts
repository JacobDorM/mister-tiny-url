import { HttpService } from './httpService'
import { Url } from '../types/urlType'

const ENDPOINT = 'url'
const httpService = new HttpService()
export const urlService = {
  getByPointer,
  save,
}

async function getByPointer(pointer: string) {
  return httpService.get<Url>(`${ENDPOINT}/${pointer}`)
}

function save(url: Url) {
  return httpService.post<Url>(`${ENDPOINT}`, url)
}
