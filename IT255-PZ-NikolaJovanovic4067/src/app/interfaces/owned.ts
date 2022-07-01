import { Car } from "./car";
import { User } from "./user";

export interface Owned {
    owned_id: number;
    user: User;
    car: Car;
}
