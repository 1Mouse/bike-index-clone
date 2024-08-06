export class ResponseError extends Error {
  response: Response;
  responseJSON?: unknown;
  status?: number;

  constructor({
    message,
    response,
    responseJSON,
    status,
  }: {
    message: string;
    response: Response;
    responseJSON?: unknown;
    status?: number;
  }) {
    super(message);
    this.response = response;
    this.responseJSON = responseJSON;
    this.status = status;
  }
}
