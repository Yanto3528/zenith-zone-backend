import express from "express";

import { validateRequestBody } from "@/middlewares/request-validation.middleware";
import { catchAsync } from "@/utils/helper.utils";
import { BadRequestError } from "@/lib/errors";

import { userServices } from "../users/users.services";

import { signupBodySchema, loginBodySchema } from "./auth.schema";
import { createAndSendToken, matchPassword } from "./auth.helpers";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validateRequestBody(signupBodySchema),
  catchAsync(async (req, res) => {
    const { email, firstName, lastName, password } = req.body;

    const existingUser = await userServices.findUserByEmail(email);
    if (existingUser) {
      throw new BadRequestError("User with this email already exist.");
    }

    const user = await userServices.createUser({
      firstName,
      lastName,
      email,
      password,
    });

    createAndSendToken(user.id, res, 201);
  }),
);
authRouter.post(
  "/login",
  validateRequestBody(loginBodySchema),
  catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await userServices.findUserByEmail(email, {
      selectPassword: true,
    });

    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const isPasswordMatch = await matchPassword(
      password,
      existingUser.password!,
    );
    if (!isPasswordMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    createAndSendToken(existingUser.id, res);
  }),
);
authRouter.delete("/logout", (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    status: "success",
  });
});

export { authRouter };
