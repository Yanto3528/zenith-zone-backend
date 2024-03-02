import express from "express";

import { requireAuth } from "@/middlewares/require-auth.middleware";
import { catchAsync } from "@/utils/helper.utils";

import { userServices } from "./users.services";

const userRouter = express.Router();

userRouter.use(requireAuth());

userRouter.get(
  "/",
  catchAsync(async (req, res) => {
    const users = await userServices.findUsers();

    res.status(200).json({
      status: "success",
      data: users,
    });
  }),
);
userRouter.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;

    const user = await userServices.findUserById(id);

    res.status(200).json({
      status: "success",
      data: user,
    });
  }),
);

export { userRouter };
