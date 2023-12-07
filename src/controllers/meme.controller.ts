import {Request, Response} from 'express';
import {BaseController} from "./base.controller";
import {MemeService} from "../services";
import {ResponseInterface, HttpStatus} from "../interfaces";
import {createMemeAdapter} from "../adapters";
import {CustomError} from "../utilities";
import {MemeValidator} from "../validators";


export class MemeController extends BaseController {

    private memeService: MemeService;

    constructor() {
        super();

        this.memeService = new MemeService();
    }


    public create = async (req: Request, res: Response<ResponseInterface>) => {
        try {

            const {body} = req;

            const newMeme = createMemeAdapter(body);

            const memeValidator = MemeValidator.parse(newMeme);

            this.memeService
                .create(memeValidator)
                .then((result) => {
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

    public getMemes = async (req: Request, res: Response<ResponseInterface>) => {
        try {

            const {query} = req;
            const {page, limit, user} = query;
            const where:any = {};
            if(user){
               where['userId'] = Number(user);
            }

            const memes = await this.memeService.paginate(Number(page),Number(limit), where);

            res.status(HttpStatus.OK).send(this.wrapResult(memes));

        } catch (error: any) {
            return this.sendErrorResponse(res, error);
        }
    }

    public getMeme = async (req: Request, res: Response<ResponseInterface>) => {
        try {

            const {params} = req;
            const {id} = params;

            const meme = await this.memeService.findOne(Number(id));

            res.status(HttpStatus.OK).send(this.wrapResult(meme));

        } catch (error: any) {
            return this.sendErrorResponse(res, error);
        }
    }

    public updateMeme = async (req: Request, res: Response<ResponseInterface>) => {
        try {

            const {params, body} = req;
            const {id} = params;

            const meme = createMemeAdapter(body);

            const memeValidator = MemeValidator.parse(meme);

            const updatedMeme = await this.memeService.update(Number(id), memeValidator);

            res.status(HttpStatus.OK).send(this.wrapResult(updatedMeme));

        } catch (error: any) {
            return this.sendErrorResponse(res, error);
        }
    }

    public deleteMeme = async (req: Request, res: Response<ResponseInterface>) => {
        try {

            const {params} = req;
            const {id} = params;

            const meme = await this.memeService.delete(Number(id));

            res.status(HttpStatus.OK).send(this.wrapResult(meme));

        } catch (error: any) {
            return this.sendErrorResponse(res, error);
        }
    }

}