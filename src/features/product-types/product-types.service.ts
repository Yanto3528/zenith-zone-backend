import { NotFoundError } from "@/lib/errors";

import { productTypeRepository } from "./product-types.repository";
import {
  CreateProductTypeInput,
  UpdateProductTypeInput,
} from "./product-types.types";

class ProductTypeService {
  findProductTypes() {
    return productTypeRepository.find();
  }

  findProductTypeById(id: string) {
    return productTypeRepository.findById(id);
  }

  createProductType(input: CreateProductTypeInput) {
    return productTypeRepository.create(input);
  }

  async updateProductType(id: string, input: UpdateProductTypeInput) {
    const productType = await productTypeRepository.findById(id);
    if (!productType) {
      throw new NotFoundError("Product type with this id does not exist");
    }

    return productTypeRepository.update(id, input);
  }

  async deleteProductType(id: string) {
    const productType = await productTypeRepository.findById(id);
    if (!productType) {
      throw new NotFoundError("Product type with this id does not exist");
    }

    return productTypeRepository.delete(id);
  }
}

export const productTypeService = new ProductTypeService();
