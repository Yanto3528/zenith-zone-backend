/* eslint-disable @typescript-eslint/no-namespace */
import jwt from "jsonwebtoken";
import { Prisma, ROLE } from "@prisma/client";

import { catchAsync } from "@/utils/helper.utils";
import { ForbiddenError, NotAuthorizedError } from "@/lib/errors";
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

export const requireAuth = (roles?: ROLE[]) =>
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

    if (roles && roles.length > 0 && !roles.includes(user.role)) {
      return next(
        new ForbiddenError("You are not allowed to access this resource."),
      );
    }

    req.user = user;

    next();
  });
