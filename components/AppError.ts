export class AppError extends Error {
    message: string;
    code: number;

    constructor(_message: string, _code: number) {
        super(_message)
        this.message = _message
        this.code = _code
    }

}