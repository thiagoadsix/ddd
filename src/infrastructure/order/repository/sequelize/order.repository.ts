import { OrderModel } from "./order.model";
import { OrderItemModel } from "./order-item.model";
import { OrderRepositoryInterface } from "~domain/checkout/repository/order-repository.interface";
import { Order } from "~domain/checkout/entity/order";
import { OrderItem } from "~domain/checkout/entity/order-item";

export class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customerId: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
      { include: [{ model: OrderItemModel }] }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        id: entity.id,
        customerId: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
      { where: { id: entity.id } }
    );
  }

  async find(id: string): Promise<Order> {
    const model = await OrderModel.findOne({
      where: { id: id },
      include: [{ model: OrderItemModel }],
    });

    const items: Array<OrderItem> = [];

    for (const iterator of model.items) {
      items.push(
        new OrderItem(
          iterator.id,
          iterator.productId,
          iterator.name,
          iterator.price,
          iterator.quantity
        )
      );
    }

    const order = new Order(model.id, model.customerId, items);

    return order;
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({ include: [{ model: OrderItemModel }] })    
    return orders.map(order => {
      const orderItems: Array<OrderItem> = []

      for (const iterator of order.items) {
        orderItems.push(new OrderItem(iterator.id, iterator.productId, iterator.name, iterator.price, iterator.quantity))
      }

      return new Order(order.id, order.customerId, orderItems)
    });
  }
}
