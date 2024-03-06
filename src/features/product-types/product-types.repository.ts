import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

import { productTypeInclude } from "./product-types.db";

class ProductTypeRepository {
  find() {
    return prisma.productType.findMany({
      include: productTypeInclude,
    });
  }

  findById(id: string) {
    return prisma.productType.findFirst({
      where: { id },
      include: productTypeInclude,
    });
  }

  create(input: Prisma.ProductTypeCreateInput) {
    return prisma.productType.create({
      data: input,
      include: productTypeInclude,
    });
  }

  update(id: string, input: Prisma.ProductTypeUpdateInput) {
    return prisma.productType.update({
      where: { id },
      data: input,
      include: productTypeInclude,
    });
  }

  delete(id: string) {
    return prisma.productType.delete({ where: { id } });
  }
}

export const productTypeRepository = new ProductTypeRepository();
