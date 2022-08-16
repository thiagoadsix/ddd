import { Customer } from "~domain/entities/customer";
import { RepositoryInterface } from "./repository.interface";

export interface CustomerRepositoryInterface extends RepositoryInterface<Customer> {}
