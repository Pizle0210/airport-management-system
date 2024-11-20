export function handleError(error: unknown): void {
  if (error instanceof Error) {
    throw new Error(`An error occurred:${error.message}`);
  } else {
    throw new Error(`An unknown error occurred: ${error}`);
  }
}
