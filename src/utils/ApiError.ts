export class ApiError extends Error {
  name = "ApiError";
  status: number;
  payload: unknown;

  constructor(message: string, status: number, payload?: unknown) {
    super(`${status} - ${message} - ${JSON.stringify(payload)}`);
    this.status = status;
    this.payload = payload;
  }
}

export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
};

export const isApiErrorWithStatus = (
  error: unknown,
  status: number,
): error is ApiError => {
  if (!isApiError(error)) {
    return false;
  }

  return status === error.status || !status;
};
