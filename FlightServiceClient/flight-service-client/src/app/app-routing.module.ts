import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightIndexComponent } from './flight/index/index.component';
import { PassengerIndexComponent } from './passenger/index/index.component';

const routes: Routes = [
  { path: '', redirectTo: 'flight', pathMatch: 'full' },
  { path: 'flight', component: FlightIndexComponent },
  { path: 'passenger', component: PassengerIndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
