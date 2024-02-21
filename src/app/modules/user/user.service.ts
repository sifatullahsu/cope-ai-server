/* eslint-disable @typescript-eslint/no-unused-vars */
import config from '../../../config'
import { ICreateData, IGetAll, IGetData, ILogin, IUpdatetData } from '../../../interface/main'
import { IUser } from './user.interface'
import { User } from './user.model'

const getAllData: IGetAll<IUser> = async () => {
  const result = await User.find({})
  return {
    data: result
  }
}

const getData: IGetData<IUser> = async id => {
  const result = await User.findById(id)
  return {
    data: result
  }
}

const updateData: IUpdatetData<IUser> = async (id, payload) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    runValidators: true,
    new: true
  })
  return {
    data: result
  }
}

const createData: ICreateData<IUser> = async data => {
  const result = await User.create(data)

  const { password, ...restData } = result.toObject()

  return {
    data: restData
  }
}

export const login: ILogin = async data => {
  // get user information
  const result = await User.findOne({ email: data.email }).select('+password')
  if (!result) throw new Error('Unauthorized access')

  // password verification
  const isPasswordValid = await User.checkPassword(data.password, result.password)
  if (!isPasswordValid) throw new Error('Unauthorized access.')

  const { password: removePassword, ...userinfo } = result.toObject()

  // generate tokens
  const tokenData = { _id: userinfo._id }
  const accessToken = User.createToken(tokenData, config.jwt.secret!, config.jwt.expiresIn!)

  const payload = {
    ...userinfo,
    accessToken
  }

  return payload
}

export const UserService = {
  getAllData,
  getData,
  updateData,
  createData,
  login
}
