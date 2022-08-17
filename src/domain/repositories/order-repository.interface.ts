import { Order } from "~domain/entities/order";
import { RepositoryInterface } from "./repository.interface";

export interface OrderRepositoryInterface extends RepositoryInterface<Order> {}
