import {Router} from "express";
import {LikeController} from "../controllers";
import {AuthMiddleware} from "../middlewares";

const router = Router();
const likeController = new LikeController();

/**
 * @swagger
 * components:
 *  schemas:
 *    Like:
 *      type: object
 *      properties:
 *        userId:
 *          type: integer
 *          description: user creator of the like
 *        memeId:
 *          type: integer
 *          description: meme of the like
 *      required:
 *        - userId
 *        - memeId
 *      example:
 *        userId: 1
 *        memeId: 1
 *
 */

/**
 * @swagger
 * /api/likes:
 *  get:
 *    summary: Get all likes
 *    tags: [likes]
 *    responses:
 *      200:
 *        description: Success getting comments
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

//get memes
router.get('/', AuthMiddleware.validate, likeController.getLikes);

/**
 * @swagger
 * /api/likes:
 *  post:
 *    summary: Create new comment
 *    tags: [likes]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *               $ref: '#/components/schemas/Like'
 *    responses:
 *      200:
 *        description: Success creating like
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

//Create new meme
router.post('/', AuthMiddleware.validate, likeController.create);


export default router;