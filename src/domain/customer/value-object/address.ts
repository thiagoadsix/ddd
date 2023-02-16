export class Address {
  private _street: string;
  private _number: number;
  private _zip: string;
  private _city: string;
  private _country: string;
  private _state: string;

  constructor(street: string, number: number, zip: string, city: string, country: string, state: string) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;
    this._country = country;
    this._state = state;
  }

  get street(): string {
    return this._street
  }

  get number(): number {
    return this._number
  }

  get zip(): string {
    return this._zip
  }

  get city(): string {
    return this._city
  }

  get country(): string {
    return this._country
  }

  get state(): string {
    return this._state
  }
}
