import { Router } from 'express';

/* * Controllers */
import ProductController from '../controllers/ProductController';
import UserController from '../controllers/UserController';

/* * Middlewares */
import authMiddleware from '../middleware/auth';

const routes = Router();


/**
 * Post track
 * @swagger
 * /users:
 *    post:
 *      tags:
 *        - users
 *      summary: "Create user"
 *      description: Create user
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 *      responses:
 *        201:
 *          description: returns a message that the user was created.
 *          content:
 *            application/json:
 *              schema:
 *                type: "object"
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "User created"
 *                  success:
 *                    type: boolean
 *                    example: true
 *                  status:
 *                    type: number
 *                    example: 201
 *        400:
 *          description: Bad request.
 *          content:
 *            application/json:
 *              schema:
 *                type: "object"
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Resource not found"
 *                  success:
 *                    type: boolean
 *                    example: false
 *                  status:
 *                    type: number
 *                    example: 201
 */
routes.post('/users', UserController.create)

/**
 * Post track
 * @swagger
 * /login:
 *    post:
 *      tags:
 *        - users
 *      summary: "Login user"
 *      description: Login user
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 *      responses:
 *        200:
 *          description: returns a message that the user was created.
 *          content:
 *            application/json:
 *              schema:
 *                type: "object"
 *                properties:
 *                  user:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: number
 *                  token:
 *                    type: string
 *                  status:
 *                    type: number
 *                    example: 200
 *        400:
 *          description: Bad request.
 *          content:
 *            application/json:
 *              schema:
 *                type: "object"
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Resource not found"
 *                  success:
 *                    type: boolean
 *                    example: false
 *                  status:
 *                    type: number
 *                    example: 201
 */
routes.post('/login', UserController.login)
routes.get('/products/search/:search', ProductController.search)

routes.use(authMiddleware);
/**
 * Get track
 * @swagger
 * /products:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - products
 *      summary: "Get a list products"
 *      description: Return a list of products
 *      responses:
 *        200:
 *          description: "Returns the list of product objects"
 *          content:
 *            application/json:
 *              schema:
 *                type: "object"
 *                properties:
 *                  status:
 *                    type: number
 *                  success:
 *                    type: boolean
 *                  data:
 *                    type: "object"
 *                    properties:
 *                      products:
 *                        type: "array"
 *                        items:
 *                          $ref: "#/components/schemas/product"
 *        500:
 *          description: Server error
 */
routes.get('/products', ProductController.index)


/**
 * Get track
 * @swagger
 * /products/{product_id}:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - products
 *      summary: "Get a product"
 *      description: Returns a product by id.
 *      parameters:
 *        - in: path
 *          name: product_id
 *          require: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: "Returns the list of product objects"
 *          content:
 *            application/json:
 *              schema:
 *                type: "object"
 *                properties:
 *                  data:
 *                    type: "object"
 *                    properties:
 *                      product:
 *                        type: "object"
 *                        $ref: "#/components/schemas/product"
 *                  message:
 *                    type: string
 *                  status:
 *                    type: number
 *        400:
 *          description: Resource not found
 *          content:
 *            application/json:
 *              schema:
 *                type: "object"
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Resource not found"
 *                  success:
 *                    type: boolean
 *                    example: false
 *                  status:
 *                    type: number
 *                    example: 400
 *        500:
 *          description: Server error
 */
routes.get('/products/:id', ProductController.show)



/**
 * Post track
 * @swagger
 * /products:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - products
 *      summary: "Create product"
 *      description: Create product
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/product"
 *      responses:
 *        201:
 *          description: returns a message that the product was created.
 *          content:
 *            application/json:
 *              schema:
 *                type: "object"
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Product created"
 *                  success:
 *                    type: boolean
 *                    example: true
 *                  status:
 *                    type: number
 *                    example: 201
 *        400:
 *          description: Bad request.
 *          content:
 *            application/json:
 *              schema:
 *                type: "object"
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Resource not found"
 *                  success:
 *                    type: boolean
 *                    example: false
 *                  status:
 *                    type: number
 *                    example: 201
 */
routes.post('/products', ProductController.create)

/**
 * Put track
 * @swagger
 * /products:
 *    put:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - products
 *      summary: "Update product"
 *      description: Update product
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/product_to_update"
 *      responses:
 *        201:
 *          description: returns a message that the product was updated.
 *          content:
 *            application/json:
 *              schema:
 *                type: "object"
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Product updated"
 *                  success:
 *                    type: boolean
 *                    example: true
 *                  status:
 *                    type: number
 *                    example: 201
 *        400:
 *          description: Bad request.
 *          content:
 *            application/json:
 *              schema:
 *                type: "object"
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Resource not found"
 *                  success:
 *                    type: boolean
 *                    example: false
 *                  status:
 *                    type: number
 *                    example: 201
 */
routes.put('/products', ProductController.update)

/**
 * Delete track
 * @swagger
 * /products:
 *    delete:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - products
 *      summary: "Delete product"
 *      description: Delete product
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/product_id"
 *      responses:
 *        200:
 *          description: returns a message that the product was updated.
 *          content:
 *            application/json:
 *              schema:
 *                type: "object"
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Product deleted"
 *                  success:
 *                    type: boolean
 *                    example: true
 *                  status:
 *                    type: number
 *                    example: 200
 *        400:
 *          description: Bad request.
 *          content:
 *            application/json:
 *              schema:
 *                type: "object"
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Resource not found"
 *                  success:
 *                    type: boolean
 *                    example: false
 *                  status:
 *                    type: number
 *                    example: 201
 */
routes.delete('/products', ProductController.delete)



export default routes