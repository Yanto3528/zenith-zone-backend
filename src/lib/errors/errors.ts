import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotAuthorizedError extends CustomError {
  constructor(message = "You are not authorized to view this resource") {
    super(message, 401);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message = "You are forbidden to access this resource") {
    super(message, 403);
  }
}

export class NotFoundError extends CustomError {
  constructor(message = "Content not found") {
    super(message, 404);
  }
}

export class ServerError extends CustomError {
  constructor(
    message = "Something went wrong in the server. Please try again later",
  ) {
    super(message, 500);
  }
}
