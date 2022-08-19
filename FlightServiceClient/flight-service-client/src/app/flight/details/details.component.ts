import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';
import { Flight } from '../flight';
import { PassengerService } from 'src/app/passenger/passenger.service';
import { Passenger } from 'src/app/passenger/passenger';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class FlightDetailsComponent implements OnInit {
  flight!: Flight;

  passengers: Passenger[] = [];

  constructor(
    private flightService: FlightService,
    private passengerService: PassengerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.url.join('/');
    this.retrieveFlight(+id.split('/')[2]);
    this.retrievePassengers();
  }

  retrieveFlight(flightId: number): void {
    this.flightService.find(flightId).subscribe(gotFlight => {
      this.flight = gotFlight;
      this.passengerService.getPassengersByFlight(this.flight.id).subscribe(p => {
        p.forEach((p: Passenger) => this.passengers.push(p))
      });
    });
  }

  retrievePassengers(): void {
    this.passengerService.getPassengers().subscribe(passengers => this.passengers = passengers);
  }

  deleteFlight(id:number) {
    this.flightService.remove(id).subscribe(res => {
      console.log("Flight deleted successfully")
    })
  }

  addPassenger(){
    
  }

}
