import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

class AttributesRepository {
  find() {
    return prisma.attribute.findMany();
  }

  findById(id: string) {
    return prisma.attribute.findFirst({ where: { id } });
  }

  findByCode(code: string) {
    return prisma.attribute.findUnique({ where: { code } });
  }

  create(input: Prisma.AttributeCreateInput) {
    return prisma.attribute.create({ data: input });
  }

  update(id: string, input: Prisma.AttributeUpdateInput) {
    return prisma.attribute.update({ where: { id }, data: input });
  }

  delete(id: string) {
    return prisma.attribute.delete({ where: { id } });
  }
}

export const attributesRepository = new AttributesRepository();
