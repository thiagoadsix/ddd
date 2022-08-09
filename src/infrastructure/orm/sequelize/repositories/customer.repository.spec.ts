import { Customer } from "../../../../domain/entities/customer";
import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../models/customer.model";
import { Address } from "../../../../domain/entities/address";
import { CustomerRepository } from "./customer.repository";

describe('Customer Repository unit tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([CustomerModel])

    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a customer model', async () => {
    const customerRepository = new CustomerRepository()
    const customerEntity = new Customer("1", "Thiago")
    const addressEntity = new Address("Street Test", 13, "57525000", "City Test", "Country Test", "ST")

    customerEntity.address = addressEntity

    await customerRepository.create(customerEntity)
    
    const customerModel = await CustomerModel.findOne({ where: { id: customerEntity.id } })

    expect(customerModel.name).toBe(customerEntity.name)
    expect(customerModel.street).toBe(customerEntity.address.street)
  });

  it('should update a customer model', async () => {
    const customerRepository = new CustomerRepository()
    const customerEntity = new Customer("2", "Thainá")
    const addressEntity = new Address("Street Test", 69, "57525000", "City Test", "Country Test", "ST")
    customerEntity.address = addressEntity
    await customerRepository.create(customerEntity)

    customerEntity.changeName("Kamilla")
    await customerRepository.update(customerEntity)

    const customerModel = await CustomerModel.findOne({ where: { id: customerEntity.id } })

    expect(customerModel.name).toBe(customerEntity.name)
  });

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository()
    const customerEntity = new Customer("3", "Raphaella")
    const addressEntity = new Address("Street Test", 12, "57525000", "City Test", "Country Test", "ST")
    customerEntity.address = addressEntity
    await customerRepository.create(customerEntity)
    
    const customerModel = await customerRepository.find(customerEntity.id)

    expect(customerModel.name).toBe(customerEntity.name)
  });

  it('should throw an error if the customer entity is not found', async () => {
    const customerRepository = new CustomerRepository()

    expect(
      async () => {
        await customerRepository.find("4")
      }
    ).rejects.toThrow("Customer not found")
  });
})
