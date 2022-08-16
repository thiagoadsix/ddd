import { Order } from "../../../../domain/entities/order";
import { RepositoryInterface } from "../../../../domain/repositories/repository.interface";
import { OrderItem } from "../../../../domain/entities/order-item";

import { OrderModel } from "../models/order.model";
import { OrderItemModel } from "../models/order-item.model";

export class OrderRepository implements RepositoryInterface<Order> {
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

  findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
}
