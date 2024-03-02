import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

import { userSelect } from "./users.db";

class UserRepositories {
  findUsers() {
    return prisma.user.findMany({ select: userSelect });
  }

  findUserById(id: string) {
    return prisma.user.findFirst({ where: { id }, select: userSelect });
  }

  findUserByEmail(email: string, selectPassword = false) {
    return prisma.user.findUnique({
      where: { email },
      select: {
        ...userSelect,
        password: selectPassword,
      },
    });
  }

  createUser(createUserInput: Prisma.UserCreateInput) {
    return prisma.user.create({
      data: createUserInput,
      select: userSelect,
    });
  }
}

export const userRepositories = new UserRepositories();
