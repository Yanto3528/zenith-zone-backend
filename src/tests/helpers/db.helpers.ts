import bcrypt from "bcrypt";
import { ROLE } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const createTestUser = async (role: ROLE = "USER") => {
  const hashedPassword = await bcrypt.hash("password", 10);

  const user = await prisma.user.create({
    data: {
      firstName: "john",
      lastName: "doe",
      email: "test@example.com",
      password: hashedPassword,
      avatarUrl: null,
      role,
    },
  });

  return user;
};

export const createTestAddress = async (userId: string, isDefault = false) => {
  const address = await prisma.address.create({
    data: {
      firstName: "John",
      lastName: "doe",
      streetAddress: "123 Main Street",
      streetAddress2: "",
      city: "New York",
      country: "USA",
      postalCode: "40001",
      isDefault,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return address;
};

export const createTestAttribute = async () => {
  const attribute = await prisma.attribute.create({
    data: {
      code: "color",
      label: "Color",
      isRequired: true,
      isPublic: true,
      metadata: [
        {
          code: "test",
          value: "test",
        },
      ],
      type: "SWATCH",
      attributeValues: [
        {
          code: "red",
          name: "Red",
          value: "#ff0000",
        },
        {
          code: "green",
          name: "Green",
          value: "#00ff00",
        },
        {
          code: "blue",
          name: "Blue",
          value: "#0000ff",
        },
      ],
    },
  });

  return attribute;
};

export const createTestProductType = async () => {
  const attribute = await createTestAttribute();
  const productType = await prisma.productType.create({
    data: {
      isShippable: false,
      name: "Computer",
      attributeIds: [attribute.id],
    },
    include: {
      attributes: true,
    },
  });

  return productType;
};
