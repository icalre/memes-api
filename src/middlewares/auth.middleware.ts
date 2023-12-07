import {NextFunction, Request, Response} from 'express';
import {ResponseInterface, HttpStatus} from "../interfaces";
import jwt from "jsonwebtoken";
import {getConfig} from "../configs";
import {UserService} from "../services";

export class AuthMiddleware {

    public static validate = async (_req: Request,
                                    res: Response<ResponseInterface>,
                                    next: NextFunction) => {
        try {

            const token: any = _req.headers["x-access-token"] || '';

            // if does not exists a token
            if (!token) {
                return res
                    .status(HttpStatus.UNAUTHORIZED)
                    .send({success: false, message: "No Token was Provided"});
            }

            const secret: string = getConfig('SECRET') || 'secret';

            const userService = new UserService();
            const user = await userService.findByToken(token);

            if(!user)
            {
                return res
                    .status(HttpStatus.UNAUTHORIZED)
                    .send({success: false, message: "Invalid Token"});
            }

            // decode the token
            const decoded: any = await jwt.verify(token, secret);

            // save the token on request object to using on routes
            _req.body.userId = decoded.id;

            return next();

        } catch (error: any) {

            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({success: false, message: error.message});
        }

    }
}