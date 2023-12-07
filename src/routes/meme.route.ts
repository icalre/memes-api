import {Router} from "express";
import {MemeController} from "../controllers";
import {AuthMiddleware} from "../middlewares";

const router = Router();
const memeController = new MemeController();

/**
 * @swagger
 * components:
 *  schemas:
 *    Meme:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          description: title of the meme
 *        image:
 *          type: string
 *          description: url of the image
 *        userId:
 *          type: integer
 *          description: user creator of the meme
 *      required:
 *        - title
 *        - image
 *        - userId
 *      example:
 *        title: "This is a meme"
 *        url: "https://www.google.com/"
 *        userId: 1
 *
 */

/**
 * @swagger
 * /api/memes:
 *  get:
 *    summary: Get all memes
 *    tags: [memes]
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
router.get('/', AuthMiddleware.validate, memeController.getMemes);

/**
 * @swagger
 * /api/memes:
 *  post:
 *    summary: Create new meme
 *    tags: [memes]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *               $ref: '#/components/schemas/Meme'
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
router.post('/',AuthMiddleware.validate, memeController.create);


/**
 * @swagger
 * /api/memes/{id}:
 *  get:
 *    summary: Get meme by id
 *    tags: [memes]
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
//Get meme
router.get('/:id',AuthMiddleware.validate, memeController.getMeme);


/**
 * @swagger
 * /api/memes/{id}:
 *  put:
 *    summary: Update Meme
 *    tags: [memes]
 *    parameters:
 *      - in: path
 *        name: id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *               $ref: '#/components/schemas/Meme'
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
router.put('/:id',AuthMiddleware.validate, memeController.updateMeme);

/**
 * @swagger
 * /api/memes/{id}:
 *  delete:
 *    summary: Delete Meme
 *    tags: [memes]
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
router.delete('/:id',AuthMiddleware.validate, memeController.deleteMeme);


export default router;