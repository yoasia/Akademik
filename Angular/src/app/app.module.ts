import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GymComponent } from './gym/gym.component';
import { LaundryComponent } from './laundry/laundry.component';
import { HomeComponent } from './home/home.component';
import { SilenceRoomComponent } from './silence-room/silence-room.component';
import { ReportComponent } from './report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    GymComponent,
    LaundryComponent,
    HomeComponent,
    SilenceRoomComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
