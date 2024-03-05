import express from "express";

import { catchAsync } from "@/utils/helper.utils";

import { attributesService } from "./attributes.service";

const attributeRouter = express.Router();

attributeRouter.get(
  "/:code",
  catchAsync(async (req, res) => {
    const attribute = await attributesService.findAttributeByCode(
      req.params.code,
    );

    res.status(200).json({
      status: "success",
      data: attribute,
    });
  }),
);

export { attributeRouter };
