import jwt from "jsonwebtoken";
import { Response } from "express";
import bcrypt from "bcrypt";

export const createAndSendToken = (
  id: string,
  res: Response,
  statusCode = 200,
) => {
  const jwtSecret = process.env.JWT_SECRET || "";
  const jwtExpires = process.env.JWT_EXPIRES || "";
  const cookieExpiresIn = Number(process.env.COOKIE_EXPIRES_IN) || 1;

  const token = jwt.sign({ id }, jwtSecret, {
    expiresIn: jwtExpires,
  });

  res.cookie("token", token, {
    expires: new Date(Date.now() + cookieExpiresIn * 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });

  res.status(statusCode).json({
    status: "success",
  });
};

export const matchPassword = async (
  plainPassword: string,
  hashedPassword: string,
) => bcrypt.compare(plainPassword, hashedPassword);
