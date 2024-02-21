import { Types } from 'mongoose'

export type IType = 'article' | 'image'

export type IStatus = 'scheduled' | 'success' | 'failed'

export type IGetAll<T> = (query: Record<string, unknown>) => Promise<{ data: T[] }>

export type IGetData<T> = (id: string) => Promise<{ data: T | null }>

export type IUpdatetData<T> = (id: string, payload: Partial<T>) => Promise<{ data: T | null }>

export type ICreateData<T> = (data: T) => Promise<{ data: T | Partial<T> }>

export type ILogin = (data: { email: string; password: string }) => Promise<{
  _id: Types.ObjectId
  name: string
  email: string
  accessToken: string
}>
