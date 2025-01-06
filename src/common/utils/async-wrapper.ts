import { NextFunction, RequestHandler, Request, Response } from 'express';
import createHttpError from 'http-errors';

export const asyncWrapper = <
    Req extends Request = Request,
    Res extends Response = Response,
    Next extends NextFunction = NextFunction,
>(
    requestHandler: (req: Req, res: Res, next: Next) => Promise<void>,
): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(
            requestHandler(req as Req, res as Res, next as Next),
        ).catch((error) => {
            if (error instanceof Error) {
                return next(createHttpError(500, error.message));
            }
            return next(createHttpError(500, 'Internal server error'));
        });
    };
};
