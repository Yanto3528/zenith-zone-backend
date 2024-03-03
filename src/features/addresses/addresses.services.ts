import {
  ForbiddenError,
  NotAuthorizedError,
  NotFoundError,
} from "@/lib/errors";

import { addressRepositories } from "./addresses.repositories";
import { AddressCreateInput, AddressUpdateInput } from "./addresses.types";

class AddressServices {
  findAddressesByUserId(userId: string) {
    return addressRepositories.findAddressesByUserId(userId);
  }
  async findAddressById(id: string, userId: string) {
    const address = await addressRepositories.findAddressById(id);
    if (!address) {
      throw new NotFoundError();
    }

    if (address.userId !== userId) {
      throw new ForbiddenError();
    }

    return address;
  }
  createAddress(input: AddressCreateInput) {
    return addressRepositories.createAddress(input);
  }
  async updateAddress(id: string, input: AddressUpdateInput) {
    const address = await addressRepositories.findAddressById(id);
    if (!address) {
      throw new NotFoundError("Address with this id does not exist");
    }

    if (address.userId !== input.userId) {
      throw new NotAuthorizedError(
        "You are not allowed to update this address",
      );
    }

    return addressRepositories.updateAddress(id, input);
  }
  async deleteAddress(id: string, userId: string) {
    const address = await addressRepositories.findAddressById(id);
    if (!address) {
      throw new NotFoundError("Address with this id does not exist");
    }

    if (address.userId !== userId) {
      throw new NotAuthorizedError(
        "You are not allowed to delete this address",
      );
    }

    return addressRepositories.deleteAddress(id);
  }
}

export const addressServices = new AddressServices();
