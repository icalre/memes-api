import {Request, Response} from 'express';
import {BaseController} from "./base.controller";
import {UserService} from "../services";
import {ResponseInterface, HttpStatus} from "../interfaces";
import {CustomError} from "../utilities";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {getConfig} from "../configs";
import {UserLoginValidator, UserValidator} from "../validators";
import {createUserAdapter} from "../adapters";


export class AuthController extends BaseController {

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
                .then(async (result) => {
                    delete result.password;
                    delete result.token;
                    const secret: string = getConfig('SECRET') || 'secret';

                    const token = jwt.sign({id: result.id}, secret, {
                        expiresIn: 60 * 60 * 24,
                    });

                    await this.userService.update(Number(result.id), {token});

                    res.status(HttpStatus.CREATED).send(this.wrapResult({user:result, token}));
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


    public login = async (req: Request, res: Response<ResponseInterface>) => {
        try {

            const {body} = req;
            const userValidator = UserLoginValidator.parse(body);

            const {email, password} = userValidator;

            const user = await this.userService.findByEmail(email);

            if (!user) {
                throw new CustomError(HttpStatus.UNAUTHORIZED, 'Email or password is incorrect');
            }

            const validPassword = bcrypt.compare(password, password);

            if (!validPassword) {
                throw new CustomError(HttpStatus.UNAUTHORIZED, 'Email or password is incorrect');
            }

            const secret: string = getConfig('SECRET') || 'secret';

            const token = jwt.sign({id: user.id}, secret, {
                expiresIn: 60 * 60 * 24,
            });

            await this.userService.update(Number(user.id), {token});

            delete user.password;
            delete user.token;

            res.status(HttpStatus.OK).send(this.wrapResult({user, token}));


        } catch (error: any) {
            let code = undefined;
            if (error.issues) {
                code = 422;
            }

            return this.sendErrorResponse(res, error, code);
        }
    }

    public logout = async (_req: Request, res: Response<ResponseInterface>) => {
        const {body} = _req;
        const {userId} = body;

        await this.userService.update(userId, {token: null});
        res.status(HttpStatus.OK).send(this.wrapResult({user: {}, token: null}));
    };

}