import jwt from "jsonwebtoken";

import { prisma } from "../lib/prisma";

declare global {
  function signin(id: string): string[];
}

beforeEach(async () => {
  vi.clearAllMocks();
  await prisma.$transaction([prisma.user.deleteMany()]);
});

global.signin = (id: string) => {
  const payload = { id };
  const token = jwt.sign(payload, process.env.JWT_SECRET!);

  return [`token=${token}`];
};
