import { Request, Response } from 'express';
import * as Yup from 'yup'
import { httpStatusCodes } from '../constants/httpStatusCodes'
import { 
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  searchProduct
} from '../services/ProductsServices'
import { apiFormatResponse } from '../utils/apiFormatResponse'


declare global {
  namespace Express {
    interface Request {
      user_id: number
    }
  }
}

export default {
  async index(req: Request, res: Response){
    const products = await getAllProducts(req.user_id)

    apiFormatResponse({
      status:  httpStatusCodes.OK,
      res,
      data: {
        products
      },
      success: true
    })
  },
  async show(req: Request, res: Response){
    try {
      const { id } = req.params
      const product = await getOneProduct(id, req.user_id)
  
      apiFormatResponse({
        status:  httpStatusCodes.OK,
        res,
        data: {
          product
        },
        success: true
      })
    } catch (err) {
      apiFormatResponse({
        status: httpStatusCodes.BAD_REQUEST,
        res,
        message: err.message,
        success: false
      })
    }
  },
  async create(req: Request, res: Response){
    try {
      const data = req.body
      console.log(req.user_id)

      const schema = Yup.object().shape({
        name: Yup.string().required().min(3).max(300),
        price: Yup.number().required(),
        quantity: Yup.number().required(),
        code: Yup.number().required()
      })
  
      await schema.validate(data, { abortEarly: false })
  
      const message = await createProduct({...data, user_id: req.user_id })
  
      apiFormatResponse({
        status: httpStatusCodes.CREATED,
        message,
        res,
        success: true
      })
    } catch (err) {
      apiFormatResponse({
        status: httpStatusCodes.BAD_REQUEST,
        message: err.message,
        success: false,
        res
      })
    }
    
  },
  async update(req: Request, res: Response){
    try {
      const data =  req.body

      const schema = Yup.object().shape({
        id: Yup.number().required(),
        name: Yup.string().min(3).max(300),
        price: Yup.number(),
        quantity: Yup.number(),
        code: Yup.number()
      })
  
      await schema.validate(data, { abortEarly: false })
  
      const message = await updateProduct({...data, user_id: req.user_id })
  
      apiFormatResponse({
        status: httpStatusCodes.CREATED,
        message,
        res,
        success: true
      })
    } catch (err) {
      apiFormatResponse({
        status: httpStatusCodes.BAD_REQUEST,
        message: err.message,
        success: false,
        res
      })
    }
  },
  async delete(req: Request, res: Response){
    try {
      const { id } =  req.body
      const message = await deleteProduct(id, req.user_id)

      apiFormatResponse({
        status: httpStatusCodes.OK,
        message,
        res,
        success: true
      })
    } catch (err) {
      apiFormatResponse({
        status: httpStatusCodes.BAD_REQUEST,
        message:err.message,
        res,
        success: true
      })
    }
  },
  async search(req: Request, res: Response){
    try {
      const { search } = req.params
      const products = await searchProduct(search)

      apiFormatResponse({
        status: httpStatusCodes.OK,
        data: {
          products
        },
        res,
        success: true
      })

    } catch (err) {
      apiFormatResponse({
        status: httpStatusCodes.INTERNAL_SERVER,
        message: err.message,
        res,
        success: true
      })
    }
  }
}