/* eslint-disable @typescript-eslint/no-namespace */
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";

import { catchAsync } from "@/utils/helper.utils";
import { NotAuthorizedError } from "@/lib/errors";
import { prisma } from "@/lib/prisma";

const jwtSecret = process.env.JWT_SECRET || "";

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    export interface Request {
      user: Prisma.UserGetPayload<Prisma.UserArgs>;
    }
  }
}

export const requireAuth = () =>
  catchAsync(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
      return next(
        new NotAuthorizedError(
          "You are not logged in. Please login to access.",
        ),
      );
    }

    const decoded = (await jwt.verify(token, jwtSecret)) as JwtPayload;
    const user = await prisma.user.findFirst({ where: { id: decoded.id } });

    if (!user) {
      return next(
        new NotAuthorizedError("User belonging to this token no longer exists"),
      );
    }

    req.user = user;

    next();
  });
