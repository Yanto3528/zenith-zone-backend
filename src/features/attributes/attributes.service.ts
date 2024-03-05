import { Prisma } from "@prisma/client";

import { NotFoundError } from "@/lib/errors";

import { attributesRepository } from "./attributes.repository";

class AttributesService {
  findAttributes() {
    return attributesRepository.find();
  }

  findAttributeById(id: string) {
    return attributesRepository.findById(id);
  }

  findAttributeByCode(code: string) {
    return attributesRepository.findByCode(code);
  }

  createAttribute(input: Prisma.AttributeCreateInput) {
    return attributesRepository.create(input);
  }

  async updateAttribute(id: string, input: Prisma.AttributeUpdateInput) {
    const attribute = await attributesRepository.findById(id);
    if (!attribute) {
      throw new NotFoundError("Attribute with this id does not exist");
    }

    return attributesRepository.update(id, input);
  }

  async deleteAttribute(id: string) {
    const attribute = await attributesRepository.findById(id);
    if (!attribute) {
      throw new NotFoundError("Attribute with this id does not exist");
    }

    return attributesRepository.delete(id);
  }
}

export const attributesService = new AttributesService();
