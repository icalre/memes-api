import {Request, Response} from 'express';
import {BaseController} from "./base.controller";
import {UserService} from "../services";
import {ResponseInterface, HttpStatus} from "../interfaces";
import {createUserAdapter} from "../adapters";
import {CustomError} from "../utilities";
import {UserValidator} from "../validators";
import bcrypt from "bcryptjs";
import {getConfig} from "../configs";


export class UserController extends BaseController {

    private userService: UserService;

    constructor() {
        super();

        this.userService = new UserService();
    }


    public create = async (req: Request, res: Response<ResponseInterface>) => {
        try {

            const {body} = req;

            const newUser = createUserAdapter(body);

            const userValidator = UserValidator.parse(newUser);

            userValidator.password = bcrypt.hashSync(userValidator.password, Number(getConfig('SALT')));

            this.userService
                .create(userValidator)
                .then((result) => {
                    delete result.password;
                    delete result.token;
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

}