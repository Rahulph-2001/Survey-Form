import { HttpStatusCode } from "../enums/HttpStatusCode";

export class AppError extends Error {
    constructor(public readonly statusCode:HttpStatusCode,message: string){
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class ValidationError extends AppError {
    constructor(message: string) {
        super(HttpStatusCode.BAD_REQUEST, message);
    }
}

export class UnauthorizedError extends AppError{
    constructor(message: string){
        super(HttpStatusCode.UNAUTHORIZED,message)
    }
}

export class NotFoundError extends AppError {
    constructor(message: string){
        super(HttpStatusCode.NOT_FOUND, message)
    }
}

