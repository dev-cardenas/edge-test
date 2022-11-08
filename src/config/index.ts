import dotenv from 'dotenv'
import path from 'path'

if (process.env.NODE_ENV === 'development') {
  dotenv.config({
    path: path.join(__dirname, '../../.env')
  })
}

if (process.env.NODE_ENV === 'testing') {
  dotenv.config({
    path: path.join(__dirname, '../../.env.test')
  })
}

export const config = {
  mode: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 5001,
  secret: process.env.APP_SECRET || 'testingonly',
  expiresIn: process.env.EXPIRES_IN  || '1h',
};