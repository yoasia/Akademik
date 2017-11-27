import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './material.module';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GymComponent } from './gym/gym.component';
import { LaundryComponent } from './laundry/laundry.component';
import { HomeComponent } from './home/home.component';
import { SilenceRoomComponent } from './silence-room/silence-room.component';
import { ReportComponent } from './report/report.component';
import { SingUpComponent } from './sing-up/sing-up.component';

@NgModule({
  declarations: [
    AppComponent,
    GymComponent,
    LaundryComponent,
    HomeComponent,
    SilenceRoomComponent,
    ReportComponent,
    SingUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
