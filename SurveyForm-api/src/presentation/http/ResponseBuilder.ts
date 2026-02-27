import { injectable } from 'inversify';
import { IResponseBuilder } from './IResponseBuilder';
import { HttpStatusCode } from '../../domain/enums/HttpStatusCode';

@injectable()
export class ResponseBuilder implements IResponseBuilder {
  public success<T>(data: T, message: string, statusCode: HttpStatusCode = HttpStatusCode.OK) {
    return {
      statusCode,
      body: {
        success: true,
        message,
        data,
      },
    };
  }

  public error(error: any) {
    const statusCode = error.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Internal Server Error';
    return {
      statusCode,
      body: {
        success: false,
        message,
        error: {
          code: error.name || 'Error',
          message,
        },
      },
    };
  }
}
