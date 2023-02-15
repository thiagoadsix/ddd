import { CustomerCreatedEvent } from "~domain/event/customer/customer-created.event";
import { SendConsoleLogOneHandler } from "~domain/event/customer/handler/send-console-log-one.handler";
import { SendConsoleLogSecondHandler } from "~domain/event/customer/handler/send-console-log-second.handler";
import { SendConsoleLogHandler } from "~domain/event/customer/handler/send-console-log.handler";
import { EventDispatcher } from "~domain/event/shared/event-dispatcher";
import { Address } from "./address";

export class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardsPoints: number = 0;

  constructor(id: string, name: string) {
    const eventHandler1 = new SendConsoleLogOneHandler();
    const eventHandler2 = new SendConsoleLogSecondHandler();
    
    const eventDispatcher = new EventDispatcher();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: this._name,
    });

    eventDispatcher.notify(customerCreatedEvent);

    this._id = id;
    this._name = name;

    this.validate()
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }

    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address): void {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLogHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    
    const customerCreatedEvent = new CustomerCreatedEvent({
      id: this._id,
      name: this._name,
      address: {
        street: address.street,
        number: address.number,
        zip: address.zip,
        city: address.city,
      }
    });
    
    eventDispatcher.notify(customerCreatedEvent);

    this._address = address;
  }

  activate(): void {
    if (this._address === undefined) {
      throw new Error("Address is required to activate a customer");
    }

    this._active = true;
  }

  deactivate(): void {
    this._active = false;
  }

  get name(): string {
    return this._name;
  }

  set address(address: Address) {
    this._address = address;
  }

  get address(): Address {
    return this._address
  }

  isActive(): boolean {
    return this._active;
  }

  get id(): string {
    return this._id;
  }

  addRewardPoints(point: number): void {
    this._rewardsPoints += point
  }

  get rewardPoints(): number {
    return this._rewardsPoints
  }
}
