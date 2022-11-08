import { Request, Response } from 'express'
import * as Yup from 'yup'
import jwt from 'jsonwebtoken'
import { httpStatusCodes } from '../constants/httpStatusCodes'
import { 
  createUser,
  getOneUser
  // getAllProducts,
  // getOneProduct,
  // updateProduct,
  // deleteProduct,
  // searchProduct
} from '../services/UserServices'
import { apiFormatResponse } from '../utils/apiFormatResponse'
import { config } from '../config'

export default {
  async create(req: Request, res: Response){
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string()
          .required()
          .min(6),
      });
  
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validations fails' });
      }

      const message = await createUser(req.body)

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
  async login(req: Request, res: Response){
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string().min(6).required(),
      });
  
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validations fails' });
      }
  
      const { email, password } = req.body;
      const user = await getOneUser(email)

      if (!user) {
        return res.status(401).json({ error: 'Wrong email or password' });
      }
      
      if(user.password !== password){
        return res.status(401).json({ error: 'Wrong email or password' });
      }
      const { id } = user;
  
      return res.status(httpStatusCodes.OK).json({
        status: httpStatusCodes.OK,
        user: {
          id
        },
        token: jwt.sign({ id, email }, config.secret, {
          expiresIn: config.expiresIn,
        }),
      });
    } catch (err) {
      apiFormatResponse({
        status: httpStatusCodes.BAD_REQUEST,
        message: err.message,
        success: false,
        res
      })
    }
  }
}