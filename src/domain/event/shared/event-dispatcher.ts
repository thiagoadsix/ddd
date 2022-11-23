import { EventDispatcherInterface } from "./interfaces/event-dispatcher.interface";
import { EventHandlerInterface } from "./interfaces/event-handler.interface";
import { EventInterface } from "./interfaces/event.interface";

interface EventHandlersResponse {
  [eventName: string]: EventHandlerInterface[]
}

export class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: EventHandlersResponse = {};

  get getEventHandlers(): EventHandlersResponse {
    return this.eventHandlers
  }

  notify(event: EventInterface): void {
    throw new Error("Method not implemented.");
  }

  register(
    eventName: string,
    eventHandler: EventHandlerInterface<EventInterface>
  ): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = []
    }

    this.eventHandlers[eventName].push(eventHandler)
  }

  unregister(
    eventName: string,
    eventHandler: EventHandlerInterface<EventInterface>
  ): void {
    throw new Error("Method not implemented.");
  }

  unregisterAll(): void {
    throw new Error("Method not implemented.");
  }
}
