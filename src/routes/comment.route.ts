import {Router} from "express";
import {CommentController} from "../controllers";
import {AuthMiddleware} from "../middlewares";

const router = Router();
const commentController = new CommentController();

/**
 * @swagger
 * components:
 *  schemas:
 *    Comment:
 *      type: object
 *      properties:
 *        text:
 *          type: string
 *          description: text of the comment
 *        userId:
 *          type: integer
 *          description: user creator of the comment
 *        memeId:
 *          type: integer
 *          description: meme of the comment
 *      required:
 *        - text
 *        - userId
 *        - memeId
 *      example:
 *        text: "This is a comment"
 *        userId: 1
 *        memeId: 1
 *
 */

/**
 * @swagger
 * /api/comments:
 *  get:
 *    summary: Get all comments
 *    tags: [comments]
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
router.get('/', AuthMiddleware.validate, commentController.getComments);

/**
 * @swagger
 * /api/comments:
 *  post:
 *    summary: Create new comment
 *    tags: [comments]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *               $ref: '#/components/schemas/Comment'
 *    responses:
 *      200:
 *        description: Success creating comment
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
router.post('/', AuthMiddleware.validate, commentController.create);

/**
 * @swagger
 * /api/comments:
 *  put:
 *    summary: Create new comment
 *    tags: [comments]
 *    parameters:
 *      - in: path
 *        name: id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *               $ref: '#/components/schemas/Comment'
 *    responses:
 *      200:
 *        description: Success creating comment
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

//Update meme
router.put('/:id', AuthMiddleware.validate, commentController.updateComment);

/**
 * @swagger
 * /api/comments/{id}:
 *  delete:
 *    summary: Delete Meme
 *    tags: [comments]
 *    parameters:
 *      - in: path
 *        name: id
 *    responses:
 *      200:
 *        description: Success creating comment
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
//Delete meme
router.delete('/:id', AuthMiddleware.validate, commentController.deleteComment);


export default router;