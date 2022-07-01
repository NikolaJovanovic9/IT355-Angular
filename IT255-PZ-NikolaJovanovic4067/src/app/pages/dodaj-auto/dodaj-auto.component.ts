import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Car } from 'src/app/interfaces/car';
import { User } from 'src/app/interfaces/user';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';
import { CarState } from 'src/app/store/state/car.state';
import { selectedCars } from 'src/app/store/selector/car.selector';

@Component({
  selector: 'app-dodaj-auto',
  templateUrl: './dodaj-auto.component.html'
})
export class DodajAutoComponent implements OnInit {

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

  
  user: User = {};
  
  public urlLocal: string = 'http://localhost:8080/dodaj';
  constructor(private car_service: CarService, private _store: Store<CarState>, private router: Router, private http: HttpClient, private userService: UserService) {
    this.user = this.userService.prijavljen;
    this.car_service.cars$ = this._store.pipe(select(selectedCars))


  }

  addCar(car: Car, user:User) {
    console.log("radi - prije");
    
    console.log("Car - id",car.car_id);
    console.log("User - id",user.user_id);
    
    this.car_service.addCarr(car, user);
    console.log("radi - posle");
    //setTimeout(() => {
      
    //this.car_service.addOwner(car,user)
    //},
      //1000);
    console.log("Car - ID", car.car_id);
    console.log("User - id", user.user_id);
    this.router.navigate(['/pocetna']);
  }

  ngOnInit(): void {
  }
}
