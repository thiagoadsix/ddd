import { EventHandlerInterface } from "~domain/event/shared/interfaces/event-handler.interface";
import { CustomerCreatedEvent } from "../customer-created.event";

export class SendConsoleLogOneHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log("This is the first console.log event: CustomerCreated");
  }
}
