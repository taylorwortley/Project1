import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PassengerService } from '../passenger.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class PassengerCreateComponent implements OnInit {
  public newPassengerForm!: FormGroup

  constructor(
    private passengerService: PassengerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.newPassengerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      occupation: new FormControl('', Validators.required)
    })
  }

  get f() { return this.newPassengerForm.controls; }

  submit() {
    this.passengerService.add(this.newPassengerForm.value).subscribe(() => {
      console.log(this.newPassengerForm.value);
      console.log(this.newPassengerForm.valid);
      console.log("Passenger created successfully!");
      this.router.navigateByUrl('passenger/index');
    });
  }

}
