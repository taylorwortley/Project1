import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FlightService } from '../flight.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class FlightCreateComponent implements OnInit {
  public newFlightForm!: FormGroup

  constructor(
    private flightService: FlightService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.newFlightForm = new FormGroup({
      flightNumber: new FormControl('', Validators.required),
      destination: new FormControl('', Validators.required),
      departureDateTime: new FormControl('', Validators.required),
      arrivalDateTime: new FormControl('', Validators.required),
      departureAirport: new FormControl('', Validators.required),
      arrivalAirport: new FormControl('', Validators.required),
      maxCapacity: new FormControl('', Validators.required)
    });
  }

  get f() { return this.newFlightForm.controls; }

  submit() {
    this.flightService.add(this.newFlightForm.value).subscribe(() => {
      console.log(this.newFlightForm.value);
      console.log(this.newFlightForm.valid);
      console.log("Flight created successfully!");
      this.router.navigateByUrl('flight/index');
    });
  }

}
