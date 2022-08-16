import { Sequelize } from "sequelize-typescript";

import { Address } from "~domain/entities/address";
import { Order } from "~domain/entities/order";
import { OrderItem } from "~domain/entities/order-item";
import { Product } from "~domain/entities/product";
import { Customer } from "~domain/entities/customer";

import { CustomerModel } from "../models/customer.model";
import { OrderItemModel } from "../models/order-item.model";
import { OrderModel } from "../models/order.model";
import { ProductModel } from "../models/product.model";

import { CustomerRepository } from "./customer.repository";
import { ProductRepository } from "./product.repository";
import { OrderRepository } from "./order.repository";

describe("Customer Repository unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new Order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Thiago");
    const address = new Address(
      "Street Test",
      13,
      "57525000",
      "City Test",
      "Country Test",
      "ST"
    );
    customer.address = address;
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Name Test", 14);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,
      2
    );

    const order = new Order("1", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: [{ model: OrderItemModel }],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "1",
      customerId: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          orderId: order.id,
          productId: orderItem.productId,
        },
      ],
    });
  });

  it("should update an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Thiago");
    const address = new Address(
      "Street Test",
      13,
      "57525000",
      "City Test",
      "Country Test",
      "ST"
    );
    customer.address = address;
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Name Test", 14);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,
      2
    );

    const order = new Order("1", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    product.changeName("Name Test Update");
    product.changePrice(28);

    order.items = [
      new OrderItem("1", product.id, product.name, product.price, 4),
    ];

    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: [{ model: OrderItemModel }],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "1",
      customerId: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          orderId: order.id,
          productId: orderItem.productId,
        },
      ],
    });
  });

  it("should find an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Thiago");
    const address = new Address(
      "Street Test",
      13,
      "57525000",
      "City Test",
      "Country Test",
      "ST"
    );
    customer.address = address;
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Name Test", 14);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,
      2
    );

    console.log('Test', { orderItem })

    const order = new Order("1", customer.id, [orderItem]);

    console.log('Test', { orderItems: order.items });

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const result = await orderRepository.find(order.id);

    expect(result.id).toBe(order.id);
    expect(result.customerId).toBe(order.customerId);
    expect(result.items.shift().price).toBe(order.items.shift().price);
  });
});
