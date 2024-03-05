import {
  ForbiddenError,
  NotAuthorizedError,
  NotFoundError,
} from "@/lib/errors";

import { addressRepository } from "./addresses.repository";
import { AddressCreateInput, AddressUpdateInput } from "./addresses.types";

class AddressService {
  findAddressesByUserId(userId: string) {
    return addressRepository.findByUserId(userId);
  }
  async findAddressById(id: string, userId: string) {
    const address = await addressRepository.findById(id);
    if (!address) {
      throw new NotFoundError();
    }

    if (address.userId !== userId) {
      throw new ForbiddenError();
    }

    return address;
  }
  createAddress(input: AddressCreateInput) {
    return addressRepository.create(input);
  }
  async updateAddress(id: string, input: AddressUpdateInput) {
    const address = await addressRepository.findById(id);
    if (!address) {
      throw new NotFoundError("Address with this id does not exist");
    }

    if (address.userId !== input.userId) {
      throw new NotAuthorizedError(
        "You are not allowed to update this address",
      );
    }

    return addressRepository.update(id, input);
  }
  async deleteAddress(id: string, userId: string) {
    const address = await addressRepository.findById(id);
    if (!address) {
      throw new NotFoundError("Address with this id does not exist");
    }

    if (address.userId !== userId) {
      throw new NotAuthorizedError(
        "You are not allowed to delete this address",
      );
    }

    return addressRepository.delete(id);
  }
}

export const addressService = new AddressService();
