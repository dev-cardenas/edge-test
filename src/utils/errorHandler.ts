import { Request, Response, NextFunction }  from 'express'
import logger from '../lib/logger'

export async function errorHandler(err: any, req: Request, res: Response, next: NextFunction){
  console.log({err})
  if (err.status === 500) {
    logger.error(err.message)
    res.status(500).json({
      message: 'Service not available'
    })
  } else {
    res.status(err.status).json({
      message: err.message
    })
  }
}

export async function notFountHandler(req: Request, res: Response){
  res.status(404).json({
    message: 'Not found'
  })
}