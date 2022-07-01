import { Car } from "./car";
import { User } from "./user";

export interface Order {
    order_id: number;
    user: User;
    car: Car;
}
