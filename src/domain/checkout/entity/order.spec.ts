import { Order } from "./order"
import { OrderItem } from "./order-item"

describe("Order unit tests", () => {
  it("should throw an error when id is empty", () => {
    const order = () => {
      new Order("", "123", [])
    }

    expect(order).toThrowError("Id is required")
  })

  it("should throw an error when customerId is empty", () => {
    const order = () => {
      new Order("123", "", [])
    }

    expect(order).toThrowError("Customer Id is required")
  })

  it("should throw an error if items are equals to zero", () => {
    const order = () => {
      new Order("123", "321", [])
    }

    expect(order).toThrowError("Items are required")
  })

  it('should calculate total', () => {
    const item = new OrderItem("123", "123", "Item Test", 100, 2)
    const item2 = new OrderItem("321", "123","Item Test", 200, 2)

    const order = new Order("123", "321", [item, item2])

    const total = order.total()

    expect(total).toEqual(600)
  });

  it('should throw an error if the item quantity is equals to zero', () => {
    const order = () => {
      const item = new OrderItem("123", "123", "Item Test", 100, 0)
      return new Order("123", "123", [item])
    }

    expect(order).toThrowError("Quantity must be greater than zero")
  });
})
