import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";

export const createTestUser = async () => {
  const hashedPassword = await bcrypt.hash("password", 10);

  const user = await prisma.user.create({
    data: {
      firstName: "john",
      lastName: "doe",
      email: "test@example.com",
      password: hashedPassword,
      avatarUrl: null,
    },
  });

  return user;
};
