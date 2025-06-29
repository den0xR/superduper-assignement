import type { Express } from "express";
import type { Request, Response, NextFunction, ErrorRequestHandler } from "express-serve-static-core";

const errorHandler: ErrorRequestHandler = (err: Error & { status?: number }, req: Request, res: Response, next: NextFunction): void => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        message: err.message,
        status: statusCode,
        stack: err.stack
    });
};

export default function setupGlobalErrorHandler(app: Express) {
    app.use(errorHandler);
}
