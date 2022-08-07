import { Product } from "./product";

describe("Product unit tests", () => {
  it('should throw an error when id is empty', () => {
    const product = () => {
      new Product("", "Product Name Test", 13)
    }

    expect(product).toThrowError("Id is required")
  });

  it('should throw an error when name is empty', () => {
    const product = () => {
      new Product("123", "", 13)
    }

    expect(product).toThrowError("Name is required")
  });

  it('should throw an error when price is negative', () => {
    const product = () => {
      new Product("123", "Product Name Test", -1)
    }

    expect(product).toThrowError("Price could not be negative")
  });

  it('should change name', () => {
    const product = new Product("123", "Product Name Test", 10)

    product.changeName("Product Name Test Updated")

    expect(product.name).toEqual("Product Name Test Updated")
  });

  it('should change price', () => {
    const product = new Product("123", "Product Name Test", 10)

    product.changePrice(13)

    expect(product.price).toEqual(13)
  });
})