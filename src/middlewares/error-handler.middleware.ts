import { ErrorRequestHandler } from "express";

import { logger } from "@/lib/logger";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  const status = err.status || "error";
  let { message } = err;

  if (err.name === "ZodError") {
    const firstIssue = err.issues[0];
    message = `${firstIssue.path[0]}: ${firstIssue.message}`;
    statusCode = 400;
  }

  logger.error(message);

  res.status(statusCode).json({
    status,
    message,
  });
};
