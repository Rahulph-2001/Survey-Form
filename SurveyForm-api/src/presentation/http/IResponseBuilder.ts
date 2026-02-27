import { HttpStatusCode } from '../../domain/enums/HttpStatusCode';

export interface IResponseBuilder {
  success<T>(data: T, message: string, statusCode?: HttpStatusCode): any;
  error(error: any): any;
}
