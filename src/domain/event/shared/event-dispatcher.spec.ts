import { SendEmailWhenProductIsCreatedHandler } from "../product/handler/send-email-when-product-is-created.handler";
import { EventDispatcher } from "./event-dispatcher";

describe('Domain Events', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()

    eventDispatcher.register("product.created", eventHandler)

    expect(eventDispatcher.getEventHandlers['product.created']).toBeDefined()
    expect(eventDispatcher.getEventHandlers['product.created'].length).toBe(1)
  });
});
