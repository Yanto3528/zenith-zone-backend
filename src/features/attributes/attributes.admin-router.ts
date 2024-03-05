import express from "express";

import { catchAsync } from "@/utils/helper.utils";
import { validateRequestBody } from "@/middlewares/request-validation.middleware";
import { requireAuth } from "@/middlewares/require-auth.middleware";

import { attributesService } from "./attributes.service";
import {
  createAttributesSchema,
  updateAttributesSchema,
} from "./attibutes.schema";

const attributeAdminRouter = express.Router();

attributeAdminRouter.use(requireAuth(["ADMIN"]));

attributeAdminRouter.get(
  "/",
  catchAsync(async (req, res) => {
    const attributes = await attributesService.findAttributes();

    res.status(200).json({
      status: "success",
      data: attributes,
    });
  }),
);

attributeAdminRouter.get(
  "/:id",
  catchAsync(async (req, res) => {
    const attribute = await attributesService.findAttributeById(req.params.id);

    res.status(200).json({
      status: "success",
      data: attribute,
    });
  }),
);

attributeAdminRouter.post(
  "/",
  validateRequestBody(createAttributesSchema),
  catchAsync(async (req, res) => {
    const {
      code,
      isRequired,
      label,
      type,
      isPublic,
      attributeValues,
      metadata,
    } = req.body;

    const attribute = await attributesService.createAttribute({
      code,
      isRequired,
      label,
      type,
      isPublic,
      attributeValues,
      metadata,
    });

    return res.status(201).json({
      status: "success",
      data: attribute,
    });
  }),
);

attributeAdminRouter.put(
  "/:id",
  validateRequestBody(updateAttributesSchema),
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const { code, isRequired, label, isPublic, attributeValues, metadata } =
      req.body;

    const attribute = await attributesService.updateAttribute(id, {
      code,
      isRequired,
      label,
      isPublic,
      attributeValues,
      metadata,
    });

    return res.status(200).json({
      status: "success",
      data: attribute,
    });
  }),
);

attributeAdminRouter.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;

    await attributesService.deleteAttribute(id);

    return res.status(200).json({
      status: "success",
      data: null,
    });
  }),
);

export { attributeAdminRouter };
