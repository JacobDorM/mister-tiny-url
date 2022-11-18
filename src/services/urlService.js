import { utilService } from './utilService.js'
import { httpService } from './http.service'

export const urlService = {
  getByPointer,
  save,
}

async function getByPointer(pointer) {
  return await httpService.get(`url/${pointer}`)
}

function save(url) {
  url.pointer = utilService.makeId()
  url.shortUrl = `http://localhost:3000/#/tinyurl/${url.pointer}`
  return httpService.post('url', url)
}
