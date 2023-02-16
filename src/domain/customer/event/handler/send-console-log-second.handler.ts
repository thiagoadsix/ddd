import { EventHandlerInterface } from "~domain/shared/event/interfaces/event-handler.interface";
import { CustomerCreatedEvent } from "../customer-created.event";

export class SendConsoleLogSecondHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log("This is the second console.log event: CustomerCreated");
  }
}
