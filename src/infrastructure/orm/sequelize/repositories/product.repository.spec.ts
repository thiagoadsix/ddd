import { Product } from "../../../../domain/entities/product";
import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../models/product.model";
import { ProductRepository } from "./product.repository";

describe('Product repository unit test', () => {
  let sequelize: Sequelize
  
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory",
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([ProductModel])

    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a product model', async () => {
    const productRepository = new ProductRepository()
    const productEntity = new Product("1", "iPhone 13", 999)

    await productRepository.create(productEntity)

    const model = await ProductModel.findOne({ where: { id: "1" } })

    const productModel = model.toJSON()

    const result = {
      id: "1",
      name: "iPhone 13",
      price: 999
    }

    expect(productModel).toStrictEqual(result)
  });
});
