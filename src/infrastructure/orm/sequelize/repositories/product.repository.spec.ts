import { Product } from "../../../../domain/entities/product";
import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../models/product.model";
import { ProductRepository } from "./product.repository";

describe('Product repository unit test', () => {
  let sequelize: Sequelize
  
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
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

  it('should update a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product("2", "iPhone 13", 999)

    await productRepository.create(product)

    product.changeName("iPhone 13 Pro")
    product.changePrice(1299)

    await productRepository.update(product)

    const model = await ProductModel.findOne({ where: { id: "2" } })

    const productModel = model.toJSON()

    const result = {
      id: "2",
      name: "iPhone 13 Pro",
      price: 1299
    }

    expect(productModel).toStrictEqual(result)
  });

  it('should find a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product("3", "iPhone 13", 999)

    await productRepository.create(product)

    const model = await ProductModel.findOne({ where: { id: "3" } })


    const productFound = await productRepository.find(product.id)

    const productModel = model.toJSON()

    expect(productModel).toStrictEqual({
      id: productFound.id,
      name: productFound.name,
      price: productFound.price
    })
  });

  it('should find all products', async () => {
    const productRepository = new ProductRepository()
    const product1 = new Product("4", "iPhone 12", 699)
    await productRepository.create(product1)
    
    const product2 = new Product("5", "Samsung S 22", 759)
    await productRepository.create(product2)

    const foundProducts = await productRepository.findAll()

    const products = [product1, product2]

    expect(products).toEqual(foundProducts)
  });
});
