import { Component, OnInit } from '@angular/core';
import { PassengerService } from '../passenger.service';
import { Passenger } from '../passenger';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class PassengerIndexComponent implements OnInit {
  passengers: Passenger[] = [];

  constructor(private passengerService: PassengerService) { }

  ngOnInit(): void {
    this.retrievePassengers();
  }

  retrievePassengers(): void {
    this.passengerService.getPassengers().subscribe(passengers => this.passengers = passengers);
  }

}
