import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { PassengerService } from '../passenger.service';
import { Passenger } from '../passenger';

@Component({
  selector: 'app-create',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class PassengerEditComponent implements OnInit {
  passenger!: Passenger;
  editPassengerForm!: FormGroup
  id: number;

  constructor(
    private passengerService: PassengerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    let url = this.route.snapshot.url.join('/');
    this.id = +url.split('/')[2];
  }

  ngOnInit(): void {
    this.passengerService.find(this.id).subscribe((p: Passenger) => {
      this.passenger = p;
    })
    this.editPassengerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      occupation: new FormControl('', Validators.required)
    })
  }

  get f() { return this.editPassengerForm.controls; }

  submit() {
    this.passengerService.edit(this.editPassengerForm.value, this.id).subscribe(() => {
      console.log(this.editPassengerForm.value);
      console.log(this.editPassengerForm.valid);
      console.log("Passenger edited successfully!");
      this.router.navigateByUrl('passenger/index'); // TODO: go back to the relevant details page instead of index
    });
  }

}
