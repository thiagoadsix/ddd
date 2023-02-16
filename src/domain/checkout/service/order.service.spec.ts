import { OrderItem } from "../entity/order-item"
import { Order } from "../entity/order"
import { OrderService } from "./order.service"
import { Customer } from "../../customer/entity/customer"

describe("Order Service unit tests", () => {
  it("should get total of all orders", () => {
    const item1 = new OrderItem("123", "123", "Item 1", 100, 1)
    const item2 = new OrderItem("321", "321", "Item 2", 200, 2)

    const order = new Order("123", "123", [item1])
    const order2 = new Order("456", "123", [item2])

    const total = OrderService.total([order, order2])

    expect(total).toBe(500)
  })

  it('should place an order', () => {
    const customer = new Customer("123", "Thiago")
    const item = new OrderItem("123", "123", "Item Name", 10, 1)

    const order = OrderService.placeOrder(customer, [item])

    expect(customer.rewardPoints).toBe(5)
    expect(order.total()).toBe(10)
  });
})
