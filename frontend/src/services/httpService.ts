import Axios, { AxiosRequestConfig } from 'axios'
// import { router } from '@/router'

const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3030/api/'

const axiosConfig: Readonly<AxiosRequestConfig> = {
  baseURL: BASE_URL,
  withCredentials: true,
}
const axios = Axios.create(axiosConfig)

interface HttpService {
  get<T>(endpoint: string, data?: Record<string, any>): Promise<T>
  post<T>(endpoint: string, data?: Record<string, any>): Promise<T>
  put<T>(endpoint: string, data?: Record<string, any>): Promise<T>
  delete<T>(endpoint: string, data?: Record<string, any>): Promise<T>
}

export const httpService: HttpService = {
  get(endpoint, data) {
    return ajax(endpoint, 'GET', data)
  },
  post(endpoint, data) {
    return ajax(endpoint, 'POST', data)
  },
  put(endpoint, data) {
    return ajax(endpoint, 'PUT', data)
  },
  delete(endpoint, data) {
    return ajax(endpoint, 'DELETE', data)
  },
}

async function ajax<T>(endpoint: string, method = 'GET', data: Record<string, unknown> | null = null): Promise<T> {
  try {
    const res = await axios({
      url: endpoint,
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
