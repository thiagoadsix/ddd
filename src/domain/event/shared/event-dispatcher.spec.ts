import { SendEmailWhenProductIsCreatedHandler } from "../product/handler/send-email-when-product-is-created.handler";
import { EventDispatcher } from "./event-dispatcher";

describe('Domain Events', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()

    eventDispatcher.register("product.created", eventHandler)

    expect(eventDispatcher.getEventHandlers['product.created']).toBeDefined()
    expect(eventDispatcher.getEventHandlers['product.created'].length).toBe(1)
    expect(eventDispatcher.getEventHandlers['product.created'][0]).toMatchObject(eventHandler)
  });

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()

    eventDispatcher.register("product.created", eventHandler)
    expect(eventDispatcher.getEventHandlers['product.created'][0]).toMatchObject(eventHandler)

    eventDispatcher.unregister("product.created", eventHandler)
    expect(eventDispatcher.getEventHandlers['product.created']).toBeDefined()
    expect(eventDispatcher.getEventHandlers['product.created'].length).toBe(0)
  })

  it('should unregister all event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()

    eventDispatcher.register("product.created", eventHandler)
    expect(eventDispatcher.getEventHandlers['product.created'][0]).toMatchObject(eventHandler)

    eventDispatcher.unregisterAll()
    expect(eventDispatcher.getEventHandlers['product.created']).toBeUndefined()
  })
});
