import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

import { userSelect } from "./users.db";

class UserRepository {
  find() {
    return prisma.user.findMany({ select: userSelect });
  }

  findById(id: string) {
    return prisma.user.findFirst({ where: { id }, select: userSelect });
  }

  findByEmail(email: string, selectPassword = false) {
    return prisma.user.findUnique({
      where: { email },
      select: {
        ...userSelect,
        password: selectPassword,
      },
    });
  }

  create(createUserInput: Prisma.UserCreateInput) {
    return prisma.user.create({
      data: createUserInput,
      select: userSelect,
    });
  }
}

export const userRepository = new UserRepository();
