import { Model, Types } from 'mongoose'
import { IStatus, IType } from '../../../interface/main'

export type IContent = {
  title: string
  description: string
  image: string
  type: IType
  status: IStatus
  user: Types.ObjectId
  scheduleHour: number
  scheduleAt: Date
}

export type IContentModel = Model<IContent>
