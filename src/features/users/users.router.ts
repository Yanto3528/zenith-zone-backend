import express from "express";

import { requireAuth } from "@/middlewares/require-auth.middleware";
import { catchAsync } from "@/utils/helper.utils";

import { userService } from "./users.service";

const userRouter = express.Router();

userRouter.use(requireAuth(["ADMIN"]));

userRouter.get(
  "/",
  catchAsync(async (req, res) => {
    const users = await userService.findUsers();

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

    const user = await userService.findUserById(id);

    res.status(200).json({
      status: "success",
      data: user,
    });
  }),
);

export { userRouter };
