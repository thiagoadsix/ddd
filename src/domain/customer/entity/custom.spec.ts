import { Address } from "../value-object/address"
import { Customer } from "./customer"

describe("customer unit tests", () => {
  it("should throw error when id is empty", () => {
    const customer = () => {
      new Customer("", "Thiago").validate()
    }

    expect(customer).toThrowError("Id is required")
  })

  it("should throw error when name is empty", () => {
    const customer = () => {
      new Customer("123", "")
    }

    expect(customer).toThrowError("Name is required")
  })

  it("should change name of customer", () => {
    const customer = new Customer("123", "John")

    customer.changeName("Jane")

    expect(customer.name).toEqual("Jane")
  })

  it("should activate a customer", () => {
    const customer = new Customer("1", "Pablo")
    const address = new Address("Street Test", 1, "57525000", "City Test", "Country Test", "State Test")

    customer.address = address

    customer.activate()

    expect(customer.isActive()).toBe(true)
  })

  it("should throw an error when address is undefined when user is been activated", () => {
    const customer = () => { 
      const customer = new Customer("1", "Pablo")
      
      customer.activate()
    }

    expect(customer).toThrowError("Address is required to activate a customer")
  })

  it("should deactivate a customer", () => {
    const customer = new Customer("1", "Pablo")

    customer.deactivate()

    expect(customer.isActive()).toBe(false)
  })

  it('should add reward points', () => {
    const customer = new Customer("1", "Pablo")
    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(10)
    
    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(20)
  });
})
