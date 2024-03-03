import { Prisma } from "@prisma/client";

export interface AddressCreateInput
  extends Omit<Prisma.AddressCreateInput, "user"> {
  userId: string;
}

export interface AddressUpdateInput
  extends Omit<Prisma.AddressUpdateInput, "user"> {
  userId: string;
}
