import { Schema, model } from 'mongoose'
import { xStatus, xType } from './content.constant'
import { IContent, IContentModel } from './content.interface'

const ContentSchema = new Schema<IContent, IContentModel>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    type: { type: String, required: true, enum: xType },
    status: { type: String, required: true, enum: xStatus },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    scheduleHour: { type: Number, required: true },
    scheduleAt: { type: Date, required: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export const Content = model<IContent, IContentModel>('Content', ContentSchema)
