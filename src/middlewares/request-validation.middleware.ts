/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodSchema } from "zod";
import { RequestHandler } from "express";

export const validateRequestBody: <TBody>(
  zodSchema: ZodSchema<TBody>,
) => RequestHandler<any, any, TBody, any> = (schema) => (req, res, next) => {
  const parsed = schema.parse(req.body);
  if (parsed) {
    return next();
  }
};
