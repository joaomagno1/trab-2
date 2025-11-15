import { Response } from 'express';
import { MessageSystem } from './message.system';

// Função helper pra padronizar o envio da resposta JSON
export function sendJsonResponse<T>(
  response: Response,
  status: number,
  message: string | null,
  data: T | null,
  path: string | null,
  error: string | any | null,
) {
  return response
    .status(status)
    .json(MessageSystem.buildResponse(status, message, data, path, error));
}