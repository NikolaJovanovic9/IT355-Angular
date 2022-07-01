import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Car } from '../interfaces/car';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { selectedCars } from '../store/selector/car.selector';
import { UserService } from './user.service';
import { User } from '../interfaces/user';
import { Order } from '../interfaces/order';
import { Owned } from '../interfaces/owned';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private url: string = 'http://localhost:8080';

  public cars$: Observable<Car[]>;
  
  constructor(private _http: HttpClient, private _store: Store) {
    this.cars$ = this._store.pipe(select(selectedCars));
  }

  public fetchCars(): Observable<Car[]> {
    return this._http.get<Car[]>(this.url+"/car");
  }
  fetchOrderedCars(user: User) {
    console.log("fetc user id"+user.user_id);
    return this._http.get<Order[]>(this.url+"/orderedCars/"+user.user_id);
  }

  fetchOwnedCars(user: User) {
    console.log("fetc user id"+user.user_id);
    return this._http.get<Owned[]>(this.url+"/ownedCars/"+user.user_id);
  }

  fetchAvailableCars(user: User) {
    console.log("fetc user id"+user.user_id);
    return this._http.get<Car[]>(this.url+"/availableCars/"+user.user_id);
  }

  fetchVlasnistvo(user: User) {
    console.log("fetc user id"+user.user_id);
    return this._http.get<Car[]>(this.url+"/vlasnistvo/"+user.user_id);
  }
 

  addOwner(car: Car, user:User) {
    console.log("-addOwner-");
    console.log("r1 - "+car.car_id);
    console.log("r2 - "+user.user_id);
    return this._http.post<any>(this.url+"/addOwner",  {car_id:car.car_id, user_id:user.user_id}).subscribe(e=>{console.log(e)});
  }

  

  addCarr(car: Car, user:User) {
    console.log("-addCar-");
    console.log("w1 - "+car.car_id);
    console.log("w2 - "+user.user_id);
    this._http.post<any>(this.url+"/addCar", car).subscribe(e=>{this.addOwner(e, user);});
  }

  orderCarr(car: Car, user:User) {
    console.log("-orderCar-");
    console.log("Car ID"+car.car_id);
    console.log("User ID"+user.user_id);
    return this._http.post<any>(this.url+"/addOrder",  {car_id:car.car_id, user_id:user.user_id}).subscribe(e=>{console.log(e)});
  }
  
  updateCar(car: Car) {
    console.log("-updateCar-");
    console.log(car.car_id);
    return this._http.put<any>(this.url+"/updateCar/"+car.car_id, car).subscribe(e=>{console.log(e)});
  }

  deleteCar(id: number) {
    console.log("-deleteCar-");
    return this._http.delete<any>(this.url+"/deleteCar/"+id).subscribe(e=>{console.log(e)});
  }

  deleteOrder(id: number) {
    console.log("-deleteOrder-");
    return this._http.delete<any>(this.url+"/deleteOrder/"+id).subscribe(e=>{console.log(e)});
  }

  deleteOwner(id: number) {
    console.log("-deleteOwner-");
    this._http.delete<any>(this.url+"/deleteOwner/"+id).subscribe(e=>{console.log(e)});
  }

}
