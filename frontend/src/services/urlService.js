import { httpService } from './http.service'

export const urlService = {
  getByPointer,
  save,
}

async function getByPointer(pointer) {
  return await httpService.get(`url/${pointer}`)
}

function save(url) {
  return httpService.post('url', url)
}
