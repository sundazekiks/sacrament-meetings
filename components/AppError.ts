export class AppError extends Error {
    message: string;
    code: number;
    statusCode: number;

    constructor(_message: string, _code: number, _statusCode: number) {
        super(_message)
        this.message = _message
        this.code = _code
        this.statusCode = _statusCode;
    }

}   