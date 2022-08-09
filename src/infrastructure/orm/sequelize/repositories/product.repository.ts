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

  async update(entity: Product): Promise<void> {
    await ProductModel.update({ name: entity.name, price: entity.price}, { where: { id: entity.id } })
  }

  async find(id: string): Promise<Product> {
    const product = await ProductModel.findOne({ where: { id: id } })

    return new Product( 
      product.id,
      product.name,
      product.price
    )
  }

  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll()

    return products.map(product => new Product(product.id, product.name, product.price))
  }
}
