import { Order } from "../entity/order";
import { OrderItem } from "../entity/order-item";

interface OrderFactoryProps {
  id: string;
  customerId: string;
  items: Array<{
    id: string
    name: string
    productId: string
    quantity: number
    price: number
  }>
}

export class OrderFactory {
  static create(orderProps: OrderFactoryProps): Order {
    const items =  orderProps.items.map(item => new OrderItem(item.id, item.productId, item.name, item.price, item.quantity));
    return new Order(orderProps.id, orderProps.customerId, items)
  }
}