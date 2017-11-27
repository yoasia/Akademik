import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GymComponent } from './gym/gym.component';
import { LaundryComponent } from './laundry/laundry.component';
import { SilenceRoomComponent } from './silence-room/silence-room.component';
import { ReportComponent } from './report/report.component';
import { SingUpComponent } from './sing-up/sing-up.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
},
{
  path: 'gym',
  component: GymComponent
},
{
  path: 'laundry',
  component: LaundryComponent
},
{
  path: 'silence-room',
  component: SilenceRoomComponent
},
{
  path: 'sing-up',
  component: SingUpComponent
},
{
  path: 'report',
  component: ReportComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
