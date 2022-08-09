import { Address } from "./address";

export class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardsPoints: number = 0;

  constructor(id: string, name: string) {
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
