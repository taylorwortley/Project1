import { Component, OnInit } from '@angular/core';
import { PassengerService } from '../passenger.service';
import { Passenger } from '../passenger';
import { FlightService } from 'src/app/flight/flight.service';
import { Flight } from 'src/app/flight/flight';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class PassengerDetailsComponent implements OnInit {
  passenger!: Passenger;

  flights: Flight[] = [];

  constructor(
    private passengerService: PassengerService,
    private flightService: FlightService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.url.join('/');
    this.retrievePassenger(+id.split('/')[2]);
    this.retrieveFlights();
  }

  retrievePassenger(passengerId: number): void {
    this.passengerService.find(passengerId).subscribe(gotPassenger => {
      this.passenger = gotPassenger;
      this.flightService.getFlightsByPassenger(this.passenger.id).subscribe(f => {
        f.forEach((f: Flight) => this.flights.push(f))
      });
    });
  }

  retrieveFlights(): void {
    this.flightService.getFlights().subscribe(flights => this.flights = flights);
  }

  deletePassenger(id: number) {
    this.passengerService.remove(id).subscribe(res => {
      console.log("Passenger deleted successfully")
    })
  }

}
