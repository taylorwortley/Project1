import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { FlightService } from '../flight.service';
import { Flight } from '../flight';

@Component({
  selector: 'app-create',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class FlightEditComponent implements OnInit {
  flight!: Flight;
  editFlightForm!: FormGroup
  id: number;

  constructor(
    private flightService: FlightService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    let url = this.route.snapshot.url.join('/');
    this.id = +url.split('/')[2];
  }

  ngOnInit(): void {
    this.flightService.find(this.id).subscribe((f: Flight) => {
      this.flight = f;
    })
    this.editFlightForm = new FormGroup({
      flightNumber: new FormControl('', Validators.required),
      destination: new FormControl('', Validators.required),
      departureDateTime: new FormControl('', Validators.required),
      arrivalDateTime: new FormControl('', Validators.required),
      departureAirport: new FormControl('', Validators.required),
      arrivalAirport: new FormControl('', Validators.required),
      maxCapacity: new FormControl('', Validators.required)
    });
  }

  get f() { return this.editFlightForm.controls; }

  submit() {
    this.flightService.edit(this.editFlightForm.value, this.id).subscribe(() => {
      console.log(this.editFlightForm.value);
      console.log(this.editFlightForm.valid);
      console.log("Passenger edited successfully!");
      this.router.navigateByUrl('passenger/index'); // TODO: go back to the relevant details page instead of index
    });
  }

}
