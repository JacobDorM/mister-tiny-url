import Axios from 'axios'
// import { router } from '@/router'

const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3030/api/'

const axios = Axios.create({
  withCredentials: true,
})

export const httpService = {
  get(endpoint: string, data?: null | object) {
    return ajax(endpoint, 'GET', data)
  },
  post(endpoint: string, data?: null | object) {
    return ajax(endpoint, 'POST', data)
  },
  put(endpoint: string, data?: null | object) {
    return ajax(endpoint, 'PUT', data)
  },
  delete(endpoint: string, data?: null | object) {
    return ajax(endpoint, 'DELETE', data)
  },
}

async function ajax(endpoint: string, method = 'GET', data: object | null = null) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: method === 'GET' ? data : null,
    })
    return res.data
  } catch (err) {
    if (err instanceof Error) {
      console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data:`, data)
      console.log(err)
      if (err.name && err.response.status === 401) {
        // Depends on routing startegy - hash or history
        // window.location.assign('/#/login')
        // window.location.assign('/login')
        // router.push('/login')
      }
    } else {
      console.log('Unexpected error', err)
    }
    throw err
  }
}
