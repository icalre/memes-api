import {Router} from "express";
import {AuthController} from "../controllers";
import {AuthMiddleware} from "../middlewares";

const router = Router();
const authController = new AuthController();

/**
 * @swagger
 * components:
 *  schemas:
 *    UserLogin:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          description: email of the user
 *        password:
 *          type: string
 *          description: password of the user
 *        description:
 *          type: string
 *          description: the description of the task
 *      required:
 *        - email
 *        - password
 *      example:
 *        email: user@gmail.com
 *        password: 1234567
 *    User:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: name of the user
 *        email:
 *          type: string
 *          description: email of the user
 *        password:
 *          type: string
 *          description: password of the user
 *        description:
 *          type: string
 *          description: the description of the task
 *      required:
 *        - name
 *        - email
 *        - password
 *      example:
 *        name: user
 *        email: user@gmail.com
 *        password: 1234567
 *    ResponseSuccess:
 *      type: object
 *      properties:
 *        success:
 *          type: boolean
 *          description: If completed or not
 *        data:
 *          type: object
 *          description: Data of the response
 *      example:
 *         success: true
 *         data: {}
 *
 *    ResponseError:
 *      type: object
 *      properties:
 *        success:
 *          type: boolean
 *          description: If completed or not
 *        message:
 *          type: string
 *          description: Message of the response
 *        extraMessage:
 *          type: string
 *          description: Extra message of the response
 *      example:
 *          success: false
 *          message: An error occurred.
 *          extraMessage: Extra message of the response
 *
 */


/**
 * @swagger
 * /api/login:
 *  post:
 *    summary: Login to the application
 *    tags: [auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *               $ref: '#/components/schemas/UserLogin'
 *    responses:
 *      200:
 *        description: Success Login
 *        content:
 *          application/json:
 *              $ref: '#/components/schemas/ResponseSuccess'
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *              $ref: '#/components/schemas/ResponseError'
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *              $ref: '#/components/schemas/ResponseError'
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *              $ref: '#/components/schemas/ResponseError'
 */

//Login User
router.post('/login', authController.login);


/**
 * @swagger
 * /api/register:
 *  post:
 *    summary: Login to the application
 *    tags: [auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *               $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: Success Login
 *        content:
 *          application/json:
 *              $ref: '#/components/schemas/ResponseSuccess'
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *              $ref: '#/components/schemas/ResponseError'
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *              $ref: '#/components/schemas/ResponseError'
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *              $ref: '#/components/schemas/ResponseError'
 */
//Register User
router.post('/register', authController.create);

/**
 * @swagger
 * /api/logout:
 *  get:
 *    summary: Logout to the application
 *    tags: [auth]
 *    responses:
 *      200:
 *        description: Success Login
 *        content:
 *          application/json:
 *              $ref: '#/components/schemas/ResponseSuccess'
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *              $ref: '#/components/schemas/ResponseError'
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *              $ref: '#/components/schemas/ResponseError'
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *              $ref: '#/components/schemas/ResponseError'
 */

//Logout User
router.get('/logout', AuthMiddleware.validate, authController.logout);


export default router;