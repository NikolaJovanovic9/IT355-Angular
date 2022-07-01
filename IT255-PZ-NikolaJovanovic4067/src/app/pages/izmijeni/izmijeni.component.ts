import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/interfaces/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-izmijeni',
  templateUrl: './izmijeni.component.html'
})
export class IzmijeniComponent implements OnInit {

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

  public cars: Car[];
  public carrr: Car;
  constructor(private _route: ActivatedRoute, private car_service: CarService, private router: Router) {
    this.car_service.cars$.subscribe(val => {
      this._route.params.subscribe(params => {
        this.carrr = <Car>JSON.parse(JSON.stringify(val.find(x => x.car_id == params['id'])));
      })
    });
  }

  updateCar(carr: Car) {

    console.log("radi");
    this.car_service.updateCar(carr);
    this.router.navigate(['/pocetna']);

  }

  ngOnInit(): void {
  }

}
