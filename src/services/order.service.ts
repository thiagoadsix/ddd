import { v4 as uuid } from "uuid"

import { OrderItem } from "../entities/order-item";
import { Customer } from "../entities/customer";
import { Order } from "../entities/order";

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
