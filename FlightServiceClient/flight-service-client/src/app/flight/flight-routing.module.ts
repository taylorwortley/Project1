import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightIndexComponent } from './index/index.component';
import { FlightCreateComponent } from './create/create.component';
import { FlightDetailsComponent } from './details/details.component';
import { FlightEditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'flight', redirectTo: 'flight/index', pathMatch: 'full' },
  { path: 'flight/index', component: FlightIndexComponent },
  { path: 'flight/create', component: FlightCreateComponent },
  { path: 'flight/details/:flightId', component: FlightDetailsComponent },
  { path: 'flight/edit/:flightId', component: FlightEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightRoutingModule { }
