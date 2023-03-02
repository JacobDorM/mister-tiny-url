import { httpService } from './httpService'
import { Url } from '../models/url.model'

const ENDPOINT = 'url'

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
