import { Address } from "../../../../domain/entities/address";
import { Customer } from "../../../../domain/entities/customer";
import { CustomerRepositoryInterface } from "../../../../domain/repositories/customer-repository.interface";
import { CustomerModel } from "../models/customer.model";

export class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
      street: entity.address.street,
      number: entity.address.number,
      zip: entity.address.zip,
      city: entity.address.city,
      country: entity.address.country,
      state: entity.address.state,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        id: entity.id,
        name: entity.name,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
        street: entity.address.street,
        number: entity.address.number,
        zip: entity.address.zip,
        city: entity.address.city,
        country: entity.address.country,
        state: entity.address.state,
      },
      { where: { id: entity.id } }
    );
  }

  async find(id: string): Promise<Customer> {
    let model: CustomerModel;

    try {
      model = await CustomerModel.findOne({
        where: { id: id },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Customer not found");
    }

    const customer = new Customer(model.id, model.name);
    const address = new Address(
      model.street,
      model.number,
      model.zip,
      model.city,
      model.country,
      model.state
    );

    customer.address = address;

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customers = await CustomerModel.findAll();

    return customers.map((customer) => {
      const customerEntity = new Customer(customer.id, customer.name);
      customerEntity.addRewardPoints(customer.rewardPoints)

      const addressEntity = new Address(
        customer.street,
        customer.number,
        customer.zip,
        customer.city,
        customer.country,
        customer.state
      );

      if (customer.active) {
        customerEntity.activate()
      }

      customerEntity.address = addressEntity;

      return customerEntity;
    });
  }
}
