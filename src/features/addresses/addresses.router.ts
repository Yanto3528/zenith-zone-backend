import express from "express";

import { validateRequestBody } from "@/middlewares/request-validation.middleware";
import { catchAsync } from "@/utils/helper.utils";
import { requireAuth } from "@/middlewares/require-auth.middleware";

import { addressService } from "./addresses.service";
import { createAddressSchema, updateAddressSchema } from "./addresses.schema";

const addressRouter = express.Router();

addressRouter.use(requireAuth());

addressRouter.get(
  "/",
  catchAsync(async (req, res) => {
    const addresses = await addressService.findAddressesByUserId(req.user.id);

    res.status(200).json({
      status: "success",
      data: addresses,
    });
  }),
);
addressRouter.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;

    const address = await addressService.findAddressById(id, req.user.id);

    res.status(200).json({
      status: "success",
      data: address,
    });
  }),
);
addressRouter.post(
  "/",
  validateRequestBody(createAddressSchema),
  catchAsync(async (req, res) => {
    const {
      firstName,
      lastName,
      city,
      country,
      countryArea,
      postalCode,
      streetAddress,
      streetAddress2,
    } = req.body;

    const newAddress = await addressService.createAddress({
      firstName,
      lastName,
      city,
      country,
      countryArea,
      postalCode,
      streetAddress,
      streetAddress2,
      userId: req.user.id,
    });

    res.status(201).json({
      status: "success",
      data: newAddress,
    });
  }),
);
addressRouter.put(
  "/:id",
  validateRequestBody(updateAddressSchema),
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      city,
      country,
      countryArea,
      postalCode,
      streetAddress,
      streetAddress2,
      isDefault,
    } = req.body;

    const updatedAddress = await addressService.updateAddress(id, {
      firstName,
      lastName,
      city,
      country,
      countryArea,
      postalCode,
      streetAddress,
      streetAddress2,
      userId: req.user.id,
      isDefault,
    });

    res.status(200).json({
      status: "success",
      data: updatedAddress,
    });
  }),
);
addressRouter.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;

    await addressService.deleteAddress(id, req.user.id);

    res.status(200).json({
      status: "success",
    });
  }),
);

export { addressRouter };
