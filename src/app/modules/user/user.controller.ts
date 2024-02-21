import asyncHandler from 'express-async-handler'
import { UserService as service } from './user.service'

const getAllData = asyncHandler(async (req, res) => {
  const { data } = await service.getAllData(req.query)

  res.status(200).json({
    success: true,
    message: 'Users fetched successfull.',
    data
  })
})

const getData = asyncHandler(async (req, res) => {
  const { data } = await service.getData(req.params.id)

  res.status(200).json({
    success: true,
    message: 'User fetched successfull.',
    data
  })
})

const updateData = asyncHandler(async (req, res) => {
  const { data } = await service.updateData(req.params.id, req.body)

  res.status(200).json({
    success: true,
    message: 'User update successfull.',
    data
  })
})

const createData = asyncHandler(async (req, res) => {
  const { data } = await service.createData(req.body)

  res.status(200).json({
    success: true,
    message: 'User created successfull.',
    data
  })
})

const login = asyncHandler(async (req, res) => {
  const result = await service.login(req.body)

  res.status(200).json({
    success: true,
    message: 'User login successfull.',
    data: result
  })
})

export const UserController = {
  getAllData,
  getData,
  updateData,
  createData,
  login
}
