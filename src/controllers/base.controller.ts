import {Response} from 'express';

import {ResponseInterface, HttpStatus} from '../interfaces';
import {CustomError} from '../utilities';

export class BaseController {

    static defaultErrorResponse: ResponseInterface = {
        success: false,
        message: 'An error occurred.',
        extraMessage: ''
    };

    private readonly responseMapper: {
        [key: string]: (extraMessage?: string) => ResponseInterface;
    } = {
        [HttpStatus.BAD_REQUEST]: (extraMessage = '') => ({
            ...BaseController.defaultErrorResponse,
            message: 'Bad Request.',
            extraMessage
        }),
        [HttpStatus.UNAUTHORIZED]: (extraMessage = '') => ({
            ...BaseController.defaultErrorResponse,
            message: 'Unauthorized.',
            extraMessage
        }),
        [HttpStatus.FORBIDDEN_RESOURCE]: (extraMessage = '') => ({
            ...BaseController.defaultErrorResponse,
            message: "You don't have permissions to acces this resource.",
            extraMessage
        }),
        [HttpStatus.NOT_FOUND]: (extraMessage = '') => ({
            ...BaseController.defaultErrorResponse,
            message: 'Not Found.',
            extraMessage: extraMessage ?? 'Resource not found.'
        }),
        [HttpStatus.INTERNAL_SERVER_ERROR]: (extraMessage = '') => ({
            ...BaseController.defaultErrorResponse,
            extraMessage: extraMessage
        }),
        [HttpStatus.VALIDATE_ERROR]: (extraMessage = '') => ({
            ...BaseController.defaultErrorResponse,
            extraMessage: extraMessage
        })
    };

    getErrorResponseBody(httpStatus: any, extraMessage?: string): ResponseInterface {
        if (httpStatus === 422){
            extraMessage = JSON.parse(extraMessage || '[]');
        }

        return this.responseMapper[httpStatus](extraMessage);
    }

    wrapResult(result: any): ResponseInterface {
        return {
            success: true,
            data: result
        };
    }

    sendErrorResponse(res: Response, error: CustomError, code?:number): void {
        let errorCode = code|| 500;
        if (error.code && Object.values(HttpStatus).includes(error.code)) {
            errorCode = error.code;
        }

        res.status(errorCode).send(this.getErrorResponseBody(errorCode, error.message));
    }
}