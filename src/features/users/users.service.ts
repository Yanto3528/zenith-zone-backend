import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

import { userRepository } from "./users.repository";

class UserService {
  findUsers() {
    return userRepository.findUsers();
  }

  findUserById(id: string) {
    return userRepository.findUserById(id);
  }

  async findUserByEmail(
    email: string,
    options: { selectPassword: boolean } = { selectPassword: false },
  ) {
    const { selectPassword } = options;

    return userRepository.findUserByEmail(email, selectPassword);
  }

  async createUser(createUserInput: Prisma.UserCreateInput) {
    createUserInput.password = await bcrypt.hash(createUserInput.password, 10);

    return userRepository.createUser(createUserInput);
  }
}

export const userService = new UserService();
