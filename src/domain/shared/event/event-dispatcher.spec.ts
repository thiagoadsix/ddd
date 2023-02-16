import { CustomerCreatedEvent } from "~domain/customer/event/customer-created.event";
import { SendConsoleLogOneHandler } from "~domain/customer/event/handler/send-console-log-one.handler";
import { SendConsoleLogSecondHandler } from "~domain/customer/event/handler/send-console-log-second.handler";
import { Address } from "../../customer/value-object/address";
import { SendEmailWhenProductIsCreatedHandler } from "~domain/product/event/handler/send-email-when-product-is-created.handler";
import { ProductCreatedEvent } from "~domain/product/event/product-created.event";
import { EventDispatcher } from "./event-dispatcher";

describe("Domain Events", () => {
  describe("Group: ProductCreatedEvent", () => {
    it("should register an event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.register("ProductCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"].length
      ).toBe(1);
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.register("ProductCreatedEvent", eventHandler);
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);

      eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"].length
      ).toBe(0);
    });

    it("should unregister all event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.register("ProductCreatedEvent", eventHandler);
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);

      eventDispatcher.unregisterAll();
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toBeUndefined();
    });

    it("should notify all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();
      const spyEventHandler = jest.spyOn(eventHandler, "handle");

      eventDispatcher.register("ProductCreatedEvent", eventHandler);
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);

      const productCreateEvent = new ProductCreatedEvent({
        name: "New Product",
        description: "Description Product",
        price: 10,
      });

      eventDispatcher.notify(productCreateEvent);

      expect(spyEventHandler).toHaveBeenCalled();
    });
  });

  describe('Group: CustomerCreatedEvent (one)', () => {
    it("should register an event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendConsoleLogOneHandler();

      eventDispatcher.register("CustomerCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
      ).toBe(1);
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendConsoleLogOneHandler();

      eventDispatcher.register("CustomerCreatedEvent", eventHandler);
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(eventHandler);

      eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
      ).toBe(0);
    });

    it("should unregister all event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendConsoleLogOneHandler();

      eventDispatcher.register("CustomerCreatedEvent", eventHandler);
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(eventHandler);

      eventDispatcher.unregisterAll();
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeUndefined();
    });

    it("should notify all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendConsoleLogOneHandler();
      const spyEventHandler = jest.spyOn(eventHandler, "handle");

      eventDispatcher.register("CustomerCreatedEvent", eventHandler);
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(eventHandler);

      const address = new Address("Street Test", 1, "57525000", "City Test", "Country Test", "State Test")

      const customerCreatedEvent = new CustomerCreatedEvent({
        id: "1",
        name: "Cellphone",
        address: address,
        active: false,
        rewardsPoints: 0
      });

      eventDispatcher.notify(customerCreatedEvent);

      expect(spyEventHandler).toHaveBeenCalled();
    });
  });

  describe('Group: CustomerCreatedEvent (second)', () => {
    it("should register an event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendConsoleLogSecondHandler();

      eventDispatcher.register("CustomerCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
      ).toBe(1);
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendConsoleLogSecondHandler();

      eventDispatcher.register("CustomerCreatedEvent", eventHandler);
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(eventHandler);

      eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
      ).toBe(0);
    });

    it("should unregister all event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendConsoleLogSecondHandler();

      eventDispatcher.register("CustomerCreatedEvent", eventHandler);
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(eventHandler);

      eventDispatcher.unregisterAll();
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeUndefined();
    });

    it("should notify all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendConsoleLogSecondHandler();
      const spyEventHandler = jest.spyOn(eventHandler, "handle");

      eventDispatcher.register("CustomerCreatedEvent", eventHandler);
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(eventHandler);

      const address = new Address("Street Test", 1, "57525000", "City Test", "Country Test", "State Test")

      const customerCreatedEvent = new CustomerCreatedEvent({
        id: "1",
        name: "Cellphone",
        address: address,
        active: false,
        rewardsPoints: 0
      });

      eventDispatcher.notify(customerCreatedEvent);

      expect(spyEventHandler).toHaveBeenCalled();
    });
  });

  describe('Group: AddressChangedEvent', () => {
    
  });
});
