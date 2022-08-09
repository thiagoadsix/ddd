import { Customer } from "domain/entities/customer";
import { CustomerRepositoryInterface } from "domain/repositories/customer-repository.interface";
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
      state: entity.address.state
    })
  }

  update(entity: Customer): Promise<void> {
    throw new Error("Method not implemented.");
  }

  find(id: string): Promise<Customer> {
    throw new Error("Method not implemented.");
  }

  findAll(): Promise<Customer[]> {
    throw new Error("Method not implemented.");
  }
}
