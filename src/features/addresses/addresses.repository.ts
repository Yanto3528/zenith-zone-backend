import { prisma } from "@/lib/prisma";

import { AddressCreateInput, AddressUpdateInput } from "./addresses.types";

class AddressRepository {
  findByUserId(userId: string) {
    return prisma.address.findMany({
      where: { userId },
      orderBy: [{ isDefault: "desc" }],
    });
  }

  findById(id: string) {
    return prisma.address.findFirst({ where: { id } });
  }

  create({ userId, ...input }: AddressCreateInput) {
    return prisma.address.create({
      data: {
        ...input,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async update(id: string, { userId, ...input }: AddressUpdateInput) {
    if (!input.isDefault) {
      return prisma.address.update({
        where: { id },
        data: input,
      });
    }

    const updatedAddress = prisma.address.update({
      where: { id },
      data: input,
    });
    const otherUpdatedAddresses = prisma.address.updateMany({
      where: {
        AND: [
          { userId },
          {
            id: {
              not: id,
            },
          },
        ],
      },
      data: {
        isDefault: false,
      },
    });

    const [newUpdatedAddress] = await prisma.$transaction([
      updatedAddress,
      otherUpdatedAddresses,
    ]);

    return newUpdatedAddress;
  }

  delete(id: string) {
    return prisma.address.delete({
      where: { id },
    });
  }
}

export const addressRepository = new AddressRepository();
