import { EventInterface } from "../shared/interfaces/event.interface";

export class CustomerCreatedEvent implements EventInterface {
  readonly dataTimeOccurred: Date;
  readonly eventData: any;

  constructor (eventData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData
  }
}
