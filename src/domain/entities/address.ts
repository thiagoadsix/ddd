export class Address {
  private street: string;
  private number: number;
  private zip: string;
  private city: string;
  private country: string;
  private state: string;

  constructor(street: string, number: number, zip: string, city: string, country: string, state: string) {
    this.street = street;
    this.number = number;
    this.zip = zip;
    this.city = city;
    this.country = country;
    this.state = state;
  }
}
