import { httpService } from './http.service'

export const urlService = {
  getByPointer,
  save,
}

interface Url {
  pointer?: string
  shortUrl?: string
  longUrl?: string
}

async function getByPointer(pointer: string) {
  return await httpService.get(`url/${pointer}`)
}

function save(url: Url) {
  return httpService.post('url', url)
}
