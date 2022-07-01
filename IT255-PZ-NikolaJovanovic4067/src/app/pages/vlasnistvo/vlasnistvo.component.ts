import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Car } from 'src/app/interfaces/car';
import { Order } from 'src/app/interfaces/order';
import { Owned } from 'src/app/interfaces/owned';
import { User } from 'src/app/interfaces/user';
import { CarService } from 'src/app/services/car.service';
import { UserService } from 'src/app/services/user.service';
import { GetCars } from 'src/app/store/actions/car.action';
import { selectedCars } from 'src/app/store/selector/car.selector';
import { CarState } from 'src/app/store/state/car.state';

@Component({
  selector: 'app-cars',
  templateUrl: './vlasnistvo.component.html'
})
export class VlasnistvoComponent implements OnInit {

  public cars$: Observable<Car[]>;
  public cars: Car[];
  public cars_property: Car[];
  carPrice: string = "";
  user: User = {};
  car: Car;
  
    
response: any;

  constructor(private _store: Store<CarState>, private userService: UserService, private car_service: CarService, private _router: Router) {
    this.user = this.userService.prijavljen;
    
    this.car_service.cars$ = this._store.pipe(select(selectedCars))

  this.car_service.fetchOwnedCars(this.userService.prijavljen).subscribe((response:Owned[])=>{
    console.log("Ordered response ", response)
    this.cars =  response.map(owner => owner.car)
   console.log("response cars - "+this.cars[0]);
   })
   console.log()
  
  }

  obrisi(car: Car, user: User) {
    if (window.confirm('Jeste li sigurni da zelite da obrisete auto?')) {
      console.log("DEl1 -  ", car.car_id);
      this.car_service.deleteOwner(car.car_id);
      setTimeout(() => {
        console.log("DEl2 -  ", car.car_id);
        this.car_service.deleteOrder(car.car_id);
      },
        1000);
      setTimeout(() => {
        console.log("DEl3 -  ", car.car_id);
        this.car_service.deleteCar(car.car_id);
        this._router.navigate(['/pocetna']);
      },
        2000);
    }
  }

  ngOnInit() {
    this._store.dispatch(new GetCars());
    
  }
}
