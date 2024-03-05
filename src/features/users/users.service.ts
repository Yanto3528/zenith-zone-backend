import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

import { userRepository } from "./users.repository";

class UserService {
  findUsers() {
    return userRepository.find();
  }

  findUserById(id: string) {
    return userRepository.findById(id);
  }

  async findUserByEmail(
    email: string,
    options: { selectPassword: boolean } = { selectPassword: false },
  ) {
    const { selectPassword } = options;

    return userRepository.findByEmail(email, selectPassword);
  }

  async createUser(createUserInput: Prisma.UserCreateInput) {
    createUserInput.password = await bcrypt.hash(createUserInput.password, 10);

    return userRepository.create(createUserInput);
  }
}

export const userService = new UserService();
