import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import { errorHandler } from "./middlewares/error-handler.middleware";
import { authRouter } from "./features/auth/auth.router";
import { userRouter } from "./features/users/users.router";
import { addressRouter } from "./features/addresses/addresses.router";
import { attributeRouter } from "./features/attributes/attributes.router";
import { attributeAdminRouter } from "./features/attributes/attributes.admin-router";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/addresses", addressRouter);
app.use("/api/v1/admin/attributes", attributeAdminRouter);
app.use("/api/v1/attributes", attributeRouter);

app.use(errorHandler);

export { app };
