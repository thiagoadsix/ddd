import { Address } from "../value-object/address";
import { CustomerFactory } from "./customer.factory";

describe('Customer Factory', () => {
  it('should create a customer', () => {
    let customer = CustomerFactory.create("John")
    
    expect(customer.id).toBeDefined()
    expect(customer.name).toBe("John")
    expect(customer.address).toBeUndefined()
  });

  it('should create a customer with an address', () => {
    const address = new Address("Marechal Floriano Peixoto", 387, "57525000", "Ouro Branco", "Brazil", "AL")

    const customer = CustomerFactory.createWithAddress("John", address)
    
    expect(customer.id).toBeDefined()
    expect(customer.name).toBe("John")
    expect(customer.address).toBe(address)
  });

});