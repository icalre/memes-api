import {Request, Response} from 'express';
import {BaseController} from "./base.controller";
import {CommentService, MemeService} from "../services";
import {ResponseInterface, HttpStatus} from "../interfaces";
import {createCommentAdapter} from "../adapters";
import {CustomError} from "../utilities";
import {CommentValidator} from "../validators";


export class CommentController extends BaseController {

    private commentService: CommentService;
    private memeService: MemeService;

    constructor() {
        super();

        this.commentService = new CommentService();
        this.memeService = new MemeService();
    }


    public create = async (req: Request, res: Response<ResponseInterface>) => {
        try {

            const {body} = req;

            const newMeme = createCommentAdapter(body);

            const memeValidator = CommentValidator.parse(newMeme);

            this.commentService
                .create(memeValidator)
                .then(async (result) => {
                    await this.memeService.updateCommentsLike(Number(result.memeId),0, 1);
                    res.status(HttpStatus.CREATED).send(this.wrapResult(result));
                })
                .catch((error: CustomError) => {
                    return this.sendErrorResponse(res, error);
                });

        } catch (error: any) {
            let code = 500;
            if (error.issues) {
                code = 422;
            }
            return this.sendErrorResponse(res, error, code);
        }
    }

    public getComments = async (req: Request, res: Response<ResponseInterface>) => {
        try {

            const {query} = req;
            const {page, limit, meme} = query;

            const memes = await this.commentService.paginate(Number(page),Number(limit), Number(meme));

            res.status(HttpStatus.OK).send(this.wrapResult(memes));

        } catch (error: any) {
            return this.sendErrorResponse(res, error);
        }
    }

    public updateComment = async (req: Request, res: Response<ResponseInterface>) => {
        try {

            const {body, params} = req;
            const {id} = params;

            const newMeme = createCommentAdapter(body);

            const memeValidator = CommentValidator.parse(newMeme);

            const comment = await this.commentService.update(Number(id), memeValidator);

            res.status(HttpStatus.OK).send(this.wrapResult(comment));

        } catch (error: any) {
            return this.sendErrorResponse(res, error);
        }
    }

    public deleteComment = async (req: Request, res: Response<ResponseInterface>) => {
        try {

            const {params} = req;
            const {id} = params;

            const comment = await this.commentService.delete(Number(id));
            await this.memeService.updateCommentsLike(Number(comment.memeId),0, -1);

            res.status(HttpStatus.OK).send(this.wrapResult(comment));

        } catch (error: any) {
            return this.sendErrorResponse(res, error);
        }
    }

}