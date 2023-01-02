import { httpService } from './http.service'
import { Url } from '../models/url.model'
export const urlService = {
  getByPointer,
  save,
}

async function getByPointer(pointer: string) {
  return await httpService.get(`url/${pointer}`)
}

function save(url: Url) {
  return httpService.post('url', url)
}
