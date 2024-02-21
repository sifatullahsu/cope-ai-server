import asyncHandler from 'express-async-handler'
import { ContentService as service } from './content.service'

const getAllData = asyncHandler(async (req, res) => {
  const { data } = await service.getAllData(req.query)

  res.status(200).json({
    success: true,
    message: 'Contents fetched successfull.',
    data
  })
})

const getData = asyncHandler(async (req, res) => {
  const { data } = await service.getData(req.params.id)

  res.status(200).json({
    success: true,
    message: 'Content fetched successfull.',
    data
  })
})

const createData = asyncHandler(async (req, res) => {
  const { data } = await service.createData({ ...req.body, user: req.user })

  res.status(200).json({
    success: true,
    message: 'Content created successfull.',
    data
  })
})

export const ContentController = {
  getAllData,
  getData,
  createData
}
