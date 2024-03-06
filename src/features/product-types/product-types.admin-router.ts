import express from "express";

import { requireAuth } from "@/middlewares/require-auth.middleware";
import { catchAsync } from "@/utils/helper.utils";
import { validateRequestBody } from "@/middlewares/request-validation.middleware";

import { productTypeService } from "./product-types.service";
import {
  createProductTypeSchema,
  updateProductTypeSchema,
} from "./product-types.schema";

const productTypesAdminRouter = express.Router();

productTypesAdminRouter.use(requireAuth(["ADMIN"]));

productTypesAdminRouter.get(
  "/",
  catchAsync(async (req, res) => {
    const productTypes = await productTypeService.findProductTypes();

    return res.status(200).json({
      status: "success",
      data: productTypes,
    });
  }),
);

productTypesAdminRouter.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;

    const productType = await productTypeService.findProductTypeById(id);

    return res.status(200).json({
      status: "success",
      data: productType,
    });
  }),
);

productTypesAdminRouter.post(
  "/",
  validateRequestBody(createProductTypeSchema),
  catchAsync(async (req, res) => {
    const { name, isShippable, attributeIds } = req.body;

    const productType = await productTypeService.createProductType({
      name,
      isShippable,
      attributeIds,
    });

    res.status(201).json({
      status: "success",
      data: productType,
    });
  }),
);

productTypesAdminRouter.put(
  "/:id",
  validateRequestBody(updateProductTypeSchema),
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const { name, isShippable, attributeIds } = req.body;

    const productType = await productTypeService.updateProductType(id, {
      name,
      isShippable,
      attributeIds,
    });

    res.status(200).json({
      status: "success",
      data: productType,
    });
  }),
);

productTypesAdminRouter.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;

    await productTypeService.deleteProductType(id);

    res.status(200).json({
      status: "success",
      data: null,
    });
  }),
);

export { productTypesAdminRouter };
