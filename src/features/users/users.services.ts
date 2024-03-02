import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

import { userRepositories } from "./users.repositories";

class UserServices {
  findUsers() {
    return userRepositories.findUsers();
  }

  findUserById(id: string) {
    return userRepositories.findUserById(id);
  }

  async findUserByEmail(
    email: string,
    options: { selectPassword: boolean } = { selectPassword: false },
  ) {
    const { selectPassword } = options;

    return userRepositories.findUserByEmail(email, selectPassword);
  }

  async createUser(createUserInput: Prisma.UserCreateInput) {
    createUserInput.password = await bcrypt.hash(createUserInput.password, 10);

    return userRepositories.createUser(createUserInput);
  }
}

export const userServices = new UserServices();
