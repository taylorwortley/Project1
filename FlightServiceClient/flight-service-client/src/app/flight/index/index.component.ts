import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';
import { Flight } from '../flight';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class FlightIndexComponent implements OnInit {
  flights: Flight[] = [];

  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
    this.retrieveFlights();
  }

  retrieveFlights(): void {
    this.flightService.getFlights().subscribe(flights => this.flights = flights);
  }

}
