import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Schema, model } from 'mongoose'
import config from '../../../config'
import { IUser, IUserModel } from './user.interface'

const userSchema = new Schema<IUser, IUserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    scheduleHour: { type: Number, required: true, default: 0 },
    password: { type: String, required: true, select: false }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.statics.hashGenerator = async password => {
  return await bcrypt.hash(password, Number(config.soltRounds))
}

userSchema.statics.checkPassword = async (givenPassword, savedPassword) => {
  return await bcrypt.compare(givenPassword, savedPassword)
}

userSchema.statics.createToken = (payload, secret, expireTime) => {
  return jwt.sign(payload, secret, { expiresIn: expireTime })
}

userSchema.statics.verifyToken = (token, secret) => {
  return jwt.verify(token, secret) as JwtPayload
}

userSchema.pre('save', async function () {
  this.password = await User.hashGenerator(this.password)
})

// userSchema.pre('findOneAndUpdate', async function () {
//   const user = <Partial<IUser>>this.getUpdate()

//   if (user?.password) {
//     user.password = await User.hashGenerator(user.password)
//   }
// })

export const User = model<IUser, IUserModel>('User', userSchema)
