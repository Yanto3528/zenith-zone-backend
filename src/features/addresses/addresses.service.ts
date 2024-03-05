import {
  ForbiddenError,
  NotAuthorizedError,
  NotFoundError,
} from "@/lib/errors";

import { addressRepository } from "./addresses.repository";
import { AddressCreateInput, AddressUpdateInput } from "./addresses.types";

class AddressService {
  findAddressesByUserId(userId: string) {
    return addressRepository.findAddressesByUserId(userId);
  }
  async findAddressById(id: string, userId: string) {
    const address = await addressRepository.findAddressById(id);
    if (!address) {
      throw new NotFoundError();
    }

    if (address.userId !== userId) {
      throw new ForbiddenError();
    }

    return address;
  }
  createAddress(input: AddressCreateInput) {
    return addressRepository.createAddress(input);
  }
  async updateAddress(id: string, input: AddressUpdateInput) {
    const address = await addressRepository.findAddressById(id);
    if (!address) {
      throw new NotFoundError("Address with this id does not exist");
    }

    if (address.userId !== input.userId) {
      throw new NotAuthorizedError(
        "You are not allowed to update this address",
      );
    }

    return addressRepository.updateAddress(id, input);
  }
  async deleteAddress(id: string, userId: string) {
    const address = await addressRepository.findAddressById(id);
    if (!address) {
      throw new NotFoundError("Address with this id does not exist");
    }

    if (address.userId !== userId) {
      throw new NotAuthorizedError(
        "You are not allowed to delete this address",
      );
    }

    return addressRepository.deleteAddress(id);
  }
}

export const addressService = new AddressService();
