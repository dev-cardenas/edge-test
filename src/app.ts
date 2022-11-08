import express from 'express'
import { Application, Response, Request } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import logger from 'morgan'
import swaggerUi from 'swagger-ui-express'

import swaggerSetup from './lib/docs'
import routes from './routes'


const app: Application = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json());


/** Cors */
if (process.env.NODE_ENV === 'production') {
  app.use(cors({
    origin: [
      'http://localhost:8080'
    ],
    credentials: true
  }))
}
app.use(logger('dev'))

app.all(['/', '/v1', '/v1/ping', '/ping'], (req: Request, res: Response) => {
    res.status(200).json({
      name: 'CRUD TESTING',
      provider: 'dev-cardenas',
      version: 'v1'
    })
})

app.use(helmet())
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup))

// Router
app.use('/api/v1', routes);

export default app