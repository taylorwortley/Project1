import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PassengerRoutingModule } from './passenger-routing.module';
import { PassengerIndexComponent } from './index/index.component';
import { PassengerCreateComponent } from './create/create.component';
import { PassengerEditComponent } from './edit/edit.component';
import { PassengerDetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    PassengerIndexComponent,
    PassengerCreateComponent,
    PassengerEditComponent,
    PassengerDetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PassengerRoutingModule
  ]
})
export class PassengerModule { }
