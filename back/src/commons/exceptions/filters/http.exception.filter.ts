import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { sendJsonResponse } from '../../message/send.response'; // Renomeei

//    Isso é um Filtro de Exceção Global.
// Quando qualquer controller lança um HttpException (tipo o NotFoundException),
// o NestJS intercepta ele e joga pra cá.
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(error: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    const status = error.getStatus();
    const message = error.message;
    const cause = error.cause; // Causa do erro

    // Aqui eu uso meu helper pra mandar o JSON formatadinho.
    return sendJsonResponse(response, status, message, null, request.path, cause);
  }
}