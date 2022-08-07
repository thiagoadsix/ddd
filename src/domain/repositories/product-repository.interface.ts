import { Product } from "../../domain/entities/product";
import { RepositoryInterface } from "./repository.interface";

export interface ProductRepositoryInterface extends RepositoryInterface<Product> {}
