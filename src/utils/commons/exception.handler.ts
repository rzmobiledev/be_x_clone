import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

type TResp = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object;
};

@Catch()
export class HttpExceptionHandler implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const respObj: TResp = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: req.url,
      response: '',
    };
    if (exception instanceof HttpException) {
      respObj.statusCode = exception.getStatus();
      respObj.response = exception.getResponse();
    } else if (exception instanceof Error) {
      respObj.statusCode = 422;
      respObj.response = exception.message.replaceAll(/\n/g, '');
    } else {
      respObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      respObj.response = String(exception);
    }
    res.status(respObj.statusCode).json(respObj);
  }
}
