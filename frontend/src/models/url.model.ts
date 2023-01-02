export interface Url {
  pointer?: string
  shortUrl?: string
  longUrl?: string
}

export interface UrlState {
  url: null | Url
}

export enum ActionTypes {
  SET_URL = 'SET_URL',
  GET_URL = 'GET_URL',
}

// understand what type to give to url
export interface urlSet {
  type: ActionTypes.SET_URL
  url: object
}

export interface urlGet {
  type: ActionTypes.GET_URL
  b: string
}

export type IAction = urlSet | urlGet
