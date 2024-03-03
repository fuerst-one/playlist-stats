export class TokenMissingError extends Error {
  name = "TokenMissingError";

  constructor() {
    super("No Spotify access token");
  }
}

export const isTokenMissingError = (
  error: unknown,
): error is TokenMissingError => {
  return error instanceof TokenMissingError;
};
