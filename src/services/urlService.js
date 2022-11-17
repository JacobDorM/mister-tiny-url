import { storageService } from './async-storage-service.js'

export const urlService = {
  query,
  getById,
  remove,
  save,
  getEmpty,
}

const URLS_KEY = 'urls'
_createUrls()

async function query() {
  let urlsToReturn = await storageService.query(URLS_KEY)
  return urlsToReturn
}

function getById(id) {
  return storageService.get(URLS_KEY, id)
}

function remove(id) {
  return storageService.remove(URLS_KEY, id)
}

function save(url) {
  if (url._id) return storageService.put(URLS_KEY, url)
  else return storageService.post(URLS_KEY, url)
}

async function getEmpty() {
  return {
    longUrl: '',
    shortUrl: '',
  }
}

async function _createUrls() {
  let urls = await storageService.query(URLS_KEY)
  if (!urls || !urls.length) {
    urls = [
      {
        _id: 'abcdef1',
        longUrl: 'https://tinyurl.com/app/',
        shortUrl: 'http://localhost:3000/abcdef1',
      },
      {
        _id: 'abcdef2',
        longUrl: 'https://www.freecodecamp.org/learn/',
        shortUrl: 'http://localhost:3000/abcdef2',
      },
      {
        _id: 'abcdef3',
        longUrl: 'https://www.udemy.com/',
        shortUrl: 'http://localhost:3000/abcdef3',
      },
    ]
    await storageService.postMany(URLS_KEY, urls)
  }
  return urls
}
