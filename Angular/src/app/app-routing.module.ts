import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GymComponent } from './gym/gym.component';
import { LaundryComponent } from './laundry/laundry.component';
import { SilenceRoomComponent } from './silence-room/silence-room.component';
import { ReportComponent } from './report/report.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  canActivate: [AuthGuard]
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'gym',
  component: GymComponent,
  canActivate: [AuthGuard]
},
{
  path: 'laundry',
  component: LaundryComponent,
  canActivate: [AuthGuard]
},
{
  path: 'silence-room',
  component: SilenceRoomComponent,
  canActivate: [AuthGuard]
},
{
  path: 'report',
  component: ReportComponent,
  canActivate: [AuthGuard]
},
// otherwise redirect to home
{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
