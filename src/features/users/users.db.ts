import { Prisma } from "@prisma/client";

export const userSelect = Prisma.validator<Prisma.UserSelect>()({
  avatarUrl: true,
  createdAt: true,
  updatedAt: true,
  email: true,
  firstName: true,
  id: true,
  lastName: true,
});
