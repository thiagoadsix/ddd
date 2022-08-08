import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../models/product.model";

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
});
