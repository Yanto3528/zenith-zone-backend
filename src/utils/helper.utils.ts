/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";

type CatchAsyncFn<ReqBody, ReqQuery> = (
  req: Request<any, any, ReqBody, ReqQuery>,
  res: Response,
  next: NextFunction,
) => Promise<any>;

export const catchAsync =
  <ReqBody = any, ReqQuery = any>(fn: CatchAsyncFn<ReqBody, ReqQuery>) =>
  (
    req: Request<any, any, ReqBody, ReqQuery>,
    res: Response,
    next: NextFunction,
  ) =>
    fn(req, res, next).catch(next);
