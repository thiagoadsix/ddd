import { v4 as uuid } from "uuid"
import { Customer } from "../../customer/entity/customer"
import { Order } from "../entity/order"
import { OrderItem } from "../entity/order-item"


export class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error("Order must have at least one item")
    }

    const order = new Order(uuid(), customer.id, items)

    customer.addRewardPoints(order.total() / 2)

    return order
  }

  static total(items: Order[]): number {
    return items.reduce((previousOrder, currentOrder) => previousOrder + currentOrder.total(), 0);
  }  
}
