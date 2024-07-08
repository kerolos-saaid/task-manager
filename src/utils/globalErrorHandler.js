import { StatusCodes } from "http-status-codes";


const globalErrorHandler = (err, req, res, next) => {
    console.error(err.stack);
    const status = res.statusCode !== StatusCodes.OK ? res.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(status).json({
        message: err.message || 'An unexpected error occurred',
        stack: err.stack,
    });
}
export default globalErrorHandler;