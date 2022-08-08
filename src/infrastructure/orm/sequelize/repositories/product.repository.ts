import { Product } from "../../../../domain/entities/product";
import { ProductRepositoryInterface } from "../../../../domain/repositories/product-repository.interface";
import { ProductModel } from "../models/product.model";

export class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price
    })
  }

  update(entity: Product): Promise<void> {
    throw new Error("Method not implemented.");
  }

  find(entity: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }

  findAll(): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
}
