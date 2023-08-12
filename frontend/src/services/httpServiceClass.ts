import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3030/api/'

interface RequestConfig extends AxiosRequestConfig {
  // Define any additional properties specific to your app, if needed
  method?: string
  url?: string
  data?: any
}

export class HttpService {
  private axiosInstance: AxiosInstance

  constructor(baseURL: string = BASE_URL) {
    const axiosConfig: AxiosRequestConfig = {
      baseURL,
      withCredentials: true,
    }
    this.axiosInstance = Axios.create(axiosConfig)
  }

  private async request<T>(
    endpoint: string = '',
    method: string,
    data: Record<string, unknown> | null = null
  ): Promise<T> {
    console.log("🚀 ~ file: httpServiceClass.ts:28 ~ HttpService ~ data:", data)
    console.log("🚀 ~ file: httpServiceClass.ts:28 ~ HttpService ~ method:", method)
    console.log("🚀 ~ file: httpServiceClass.ts:28 ~ HttpService ~ endpoint:", endpoint)
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.request({
        url: endpoint,
        method,
        data,
        params: method === 'GET' ? data : null,
      })
      return response.data
    } catch (err) {
      this.handleRequestError(err as AxiosError)
      throw err
    }
  }

  private handleRequestError(error: AxiosError): void {
    if (error.isAxiosError) {
      const { config = {} as RequestConfig, response } = error
      const { method, url, data }: RequestConfig = config
      console.log(`Had Issues ${method}ing to the backend, endpoint: ${url}, with data:`, data)
      console.log(error)
      if (response) {
        const { status, data }: AxiosResponse = response

        switch (status) {
          case 200:
            // Handle successful response data, if needed
            break
          case 201:
            // Handle resource created, e.g., show a success message or navigate to the new resource
            break
          case 204:
            // Handle successful request with no content, e.g., refresh page or show success message
            break
          case 400:
            // Handle bad request, e.g., show an error message to the user and guide them to fix the issue
            break
          case 401:
            console.log('data', data)
            // Handle unauthorized error, e.g., redirect to the login page
            // window.location.assign('/login');
            // Depends on routing startegy - hash or history
            // window.location.assign('/#/login')
            // window.location.assign('/login')
            // router.push('/login')
            break
          case 403:
            // Handle forbidden error, e.g., show a message indicating lack of permissions
            break
          case 404:
            // Handle not found error, e.g., show a friendly error message to the user
            // Todo: add toast this page does not exist.
            break
          case 409:
            // Handle conflict error, e.g., show a message indicating a conflict with the current state of the resource
            break
          case 429:
            // Handle too many requests error, e.g., show a message indicating rate-limiting or ask the user to slow down
            break
          case 500:
            // Handle internal server error, e.g., show a "something went wrong" message
            // Todo: add toast something went wrong.
            break
          case 503:
            // Handle service unavailable error, e.g., show a message indicating unavailability and suggest trying again later
            break
          // Add more cases as needed for other status codes
          default:
            // Handle any other status code not explicitly handled
            break
        }
      } else {
        console.log('Unexpected error', error)
      }
    }
  }

  public get<T>(endpoint: string, data?: Record<string, any>): Promise<T> {
    return this.request<T>(endpoint, 'GET', data)
  }

  public post<T>(endpoint: string, data?: Record<string, any>): Promise<T> {
    return this.request<T>(endpoint, 'POST', data)
  }

  public put<T>(endpoint: string, data?: Record<string, any>): Promise<T> {
    return this.request<T>(endpoint, 'PUT', data)
  }

  public delete<T>(endpoint: string, data?: Record<string, any>): Promise<T> {
    return this.request<T>(endpoint, 'DELETE', data)
  }
}
