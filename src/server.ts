import 'dotenv/config'
import { Request, Response, NextFunction }  from 'express'
import chalk from 'chalk'
import * as http from 'http'
import morgan from 'morgan'
import logger from './lib/logger'
import app from './app'
import { createDBIfNotExist } from './database/initDB'
import { config } from './config'
import { errorHandler, notFountHandler } from './utils/errorHandler'

const port = config.port

const figlet = require('figlet')
const server = http.createServer(app)

createDBIfNotExist()

app.use(errorHandler)
app.use(notFountHandler)
app.use(morgan('dev'))

server.listen(port, () => {
  figlet('CRUD - API', (err: any, figletText: any) => {
    if (err) {
      throw err
    }
    process.stdout.write(chalk.green(figletText + '\n'))
    logger.info(`API is running on: ${port}`)
  })
})