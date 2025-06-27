export class HttpError extends Error {
  status: number;
  statusText: string;
  message: string;

  private constructor(status: number, statusText: string, body: string) {
    super();
    this.status = status;
    this.statusText = statusText;
    this.message = body;
  }

  static async fromResponse(response: Response): Promise<HttpError> {
    const body = await response.text();
    return new HttpError(response.status, response.statusText, body);
  }
}
