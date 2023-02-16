import { EventHandlerInterface } from "~domain/shared/event/interfaces/event-handler.interface";
import { AddressChangedEvent } from "../address-changed.event";

export class SendConsoleLogHandler
  implements EventHandlerInterface<AddressChangedEvent>
{
  handle(event: AddressChangedEvent): void {
    console.log(`Address client: ${event.eventData.id}, ${event.eventData.name}, changed for ${JSON.stringify(event.eventData.address)}`);
  }
}
