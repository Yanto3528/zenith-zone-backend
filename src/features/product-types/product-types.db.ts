import { Prisma } from "@prisma/client";

export const productTypeInclude = Prisma.validator<Prisma.ProductTypeInclude>()(
  {
    attributes: true,
  },
);
