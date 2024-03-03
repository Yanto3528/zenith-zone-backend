import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

import { logger } from "@/lib/logger";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const { message } = err;
  let errors = [{ message }];

  if (err.name === "ZodError") {
    errors = (err as ZodError).issues.map((issue) => ({
      message: issue.message,
      path: issue.path,
      code: issue.code,
    }));
    statusCode = 400;
  }

  logger.error(message);

  res.status(statusCode).json({
    status,
    errors,
  });
};
