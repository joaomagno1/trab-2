// A interface pro nosso objeto de resposta
export interface Result<T> {
  status: number;
  timestamp: string;
  message?: string | null;
  error?: string | null | unknown;
  data?: T | null;
  path: string | null;
}

// Renomeei de "Message" para "ApiResponse"
// Fica mais claro que é uma resposta da API.
export class ApiResponse<T> {
  status: number = 0;
  message: string | null = null;
  error: string | unknown | null = null;
  data: T | null = null;
  path: string | null = null;

  constructor(
    status: number,
    message: string | null = null,
    data: T | null = null,
    path: string | null = null,
    error: string | unknown | null = null,
  ) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.path = path;
    this.error = error;
  }

  toJSON(): Result<T> {
    const responsePayload: Result<T> = {
      status: this.status,
      timestamp: new Date().toISOString().split('T')[0], // Só a data
      path: this.path,
    };

    if (this.message !== null && this.message !== undefined) {
      responsePayload.message = this.message;
    }

    if (this.data !== null && this.data !== undefined) {
      responsePayload.data = this.data;
    }

    if (this.error !== null && this.error !== undefined) {
      responsePayload.error = this.error;
    }

    return responsePayload;
  }
}