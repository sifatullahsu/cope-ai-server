import { scheduleJob } from 'node-schedule'
import config from '../../../config'
import { ICreateData, IGetAll, IGetData } from '../../../interface/main'
import { User } from '../user/user.model'
import { IContent } from './content.interface'
import { Content } from './content.model'

const getAllData: IGetAll<IContent> = async query => {
  // it can be possible to handle the query professionally
  const { status, user, type } = query
  query = status && user && type ? { status, user, type } : status && user ? { status, user } : {}

  const result = await Content.find(query)
  return {
    data: result
  }
}

const getData: IGetData<IContent> = async id => {
  const result = await Content.findById(id)
  return {
    data: result
  }
}

const createData: ICreateData<IContent> = async data => {
  const user = await User.findById(data.user, { scheduleHour: 1 }).lean()

  if (!user) {
    throw new Error('Unauthorized user.')
  }

  const schedule = new Date(new Date().getTime() + user.scheduleHour * 60 * 60 * 1000)

  data.scheduleHour = user.scheduleHour
  data.scheduleAt = schedule
  data.status = user.scheduleHour ? 'scheduled' : 'success'

  const result = await Content.create(data)

  if (user.scheduleHour && result._id) {
    const job = scheduleJob(schedule, async () => {
      await Content.findByIdAndUpdate(result._id, { status: 'success' })

      const pageId = config.pageId
      const graphToken = config.graphToken
      const api = `https://graph.facebook.com/v19.0/${pageId}/photos`
      const message = `${data.title}%0A%0A${data.description}`

      await fetch(`${api}?message=${message}&url=${data.image}&access_token=${graphToken}`, {
        method: 'POST'
      })

      job.cancel()
    })
  }

  return {
    data: result
  }
}

export const ContentService = {
  getAllData,
  getData,
  createData
}
