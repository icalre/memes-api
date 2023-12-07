import {Request, Response} from 'express';
import {BaseController} from "./base.controller";
import {LikeService, MemeService} from "../services";
import {ResponseInterface, HttpStatus} from "../interfaces";
import {createLikeAdapter} from "../adapters";
import {CustomError} from "../utilities";
import {LikeValidator} from "../validators";


export class LikeController extends BaseController {

    private likeService: LikeService;
    private memeService: MemeService;

    constructor() {
        super();

        this.likeService = new LikeService();
        this.memeService = new MemeService();
    }


    public create = async (req: Request, res: Response<ResponseInterface>) => {
        try {

            const {body} = req;

            const newMeme = createLikeAdapter(body);

            const memeValidator = LikeValidator.parse(newMeme);

            this.likeService
                .create(memeValidator)
                .then( async (result) => {
                    await this.memeService.updateCommentsLike(Number(result.memeId),1, 0);
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

    public getLikes = async (req: Request, res: Response<ResponseInterface>) => {
        try {

            const {query} = req;
            const {page, limit, meme} = query;

            const memes = await this.likeService.paginate(Number(page),Number(limit), Number(meme));

            res.status(HttpStatus.OK).send(this.wrapResult(memes));

        } catch (error: any) {
            return this.sendErrorResponse(res, error);
        }
    }

    public delete = async (req: Request, res: Response<ResponseInterface>) => {
        try {

            const {params} = req;
            const {id} = params;

            const like = await this.likeService.delete(Number(id));

            await this.memeService.updateCommentsLike(Number(like.memeId),-1, 0);

            res.status(HttpStatus.OK).send(this.wrapResult(like));

        } catch (error: any) {
            return this.sendErrorResponse(res, error);
        }
    }

}