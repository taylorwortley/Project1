import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PassengerIndexComponent } from './index/index.component';
import { PassengerCreateComponent } from './create/create.component';
import { PassengerDetailsComponent } from './details/details.component';
import { PassengerEditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'passenger', redirectTo: 'passenger/index', pathMatch: 'full' },
  { path: 'passenger/index', component: PassengerIndexComponent },
  { path: 'passenger/create', component: PassengerCreateComponent },
  { path: 'passenger/details/:passengerId', component: PassengerDetailsComponent },
  { path: 'passenger/edit/:passengerId', component: PassengerEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassengerRoutingModule { }
