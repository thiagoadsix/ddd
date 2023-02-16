import { RepositoryInterface } from "~domain/shared/repositories/repository.interface";
import { Order } from "../entity/order";

export interface OrderRepositoryInterface extends RepositoryInterface<Order> {}
