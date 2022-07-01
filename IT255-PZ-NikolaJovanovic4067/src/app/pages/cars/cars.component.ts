import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Car } from 'src/app/interfaces/car';
import { User } from 'src/app/interfaces/user';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';
import { GetCars } from 'src/app/store/actions/car.action';
import { selectedCars } from 'src/app/store/selector/car.selector';
import { CarState } from 'src/app/store/state/car.state';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html'
})
export class CarsComponent implements OnInit {

  public cars$: Observable<Car[]>;
  public cars: Car[];

  public cars_vlasnistvo: Car[];
  carPrice: string = "";
  user: User = {};
  car: Car = {
    car_id: 0,
    brand: '',
    model: '',
    price: 0,
    year: 0,
    body: '',
    fuel: '',
    location: ''
  };

  response: any;
  constructor(private http: HttpClient, private router: Router, private _store: Store<CarState>, private userService: UserService, private car_service: CarService, private _router: Router) {
    this.user = this.userService.prijavljen;
    this.car_service.cars$ = this._store.pipe(select(selectedCars))


    this.car_service.fetchAvailableCars(this.userService.prijavljen).subscribe((response: Car[]) => {
      console.log("It is a responsea ", response)
      this.cars = response;

    })
    console.log()
    this.user = this.userService.prijavljen;

  }


  kupi(car: Car, user: User) {
    console.log("-orderCar-");
    console.log(car.car_id);
    console.log(user.user_id);
    this.car_service.orderCarr(car, user);

    this.router.navigate(['/pocetna']);
  }

  ngOnInit() {
    
    this._store.dispatch(new GetCars());
  }
}
