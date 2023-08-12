export interface Url {
  pointer?: string
  shortUrl?: string
  longUrl?: string
}

export interface UrlState {
  url: null | Url
}

export enum UrlActionTypes {
  SET_URL = 'SET_URL',
  GET_URL = 'GET_URL',
}

// understand what type to give to url
interface urlSet {
  type: UrlActionTypes.SET_URL
  url: object
}

interface urlGet {
  type: UrlActionTypes.GET_URL
  b: string
}

export type UrlActions = urlSet | urlGet
