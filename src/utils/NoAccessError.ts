export class NoAccessError extends Error {
  name = "NoAccessError";

  constructor() {
    super("Please request access to use this website.");
  }
}

export const isNoAccessError = (error: unknown): error is NoAccessError => {
  return error instanceof NoAccessError;
};
