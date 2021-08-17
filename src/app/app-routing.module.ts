import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { BookingComponent } from './components/booking/booking.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path:'booking', component:BookingComponent},
  {path:'booking-list', component:BookingListComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'', redirectTo:"/dashboard", pathMatch:"full"},
  {path:'**', redirectTo:"/dashboard", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
