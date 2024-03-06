import { Prisma } from "@prisma/client";

export interface CreateProductTypeInput
  extends Omit<Prisma.ProductTypeCreateInput, "attributes"> {
  attributeIds: string[];
}

export interface UpdateProductTypeInput
  extends Omit<Prisma.ProductTypeUpdateInput, "attributes"> {
  attributeIds: string[];
}
