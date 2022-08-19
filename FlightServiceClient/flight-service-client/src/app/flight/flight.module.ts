import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FlightRoutingModule } from './flight-routing.module';
import { FlightIndexComponent } from './index/index.component';
import { FlightCreateComponent } from './create/create.component';
import { FlightEditComponent } from './edit/edit.component';
import { FlightDetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    FlightIndexComponent,
    FlightCreateComponent,
    FlightEditComponent,
    FlightDetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FlightRoutingModule
  ]
})
export class FlightModule { }
