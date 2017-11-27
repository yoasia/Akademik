import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { GymComponent } from './gym/gym.component'
import { LaundryComponent } from './laundry/laundry.component'
import { SilenceRoomComponent } from './silence-room/silence-room.component'
import { ReportComponent } from './report/report.component'
import { LoginGuard } from './login.guard'

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  canActivate: [LoginGuard]
},
{
  path: 'gym',
  component: GymComponent,
  canActivate: [LoginGuard]
},
{
  path: 'laundry',
  component: LaundryComponent,
  canActivate: [LoginGuard]
},
{
  path: 'silence-room',
  component: SilenceRoomComponent,
  canActivate: [LoginGuard]
},
{
  path: 'report',
  component: ReportComponent,
  canActivate: [LoginGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
