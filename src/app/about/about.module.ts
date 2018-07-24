import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { HotelComponent } from './hotel/hotel.component';
import { RoomsComponent } from './rooms/rooms.component';
import { CostsComponent } from './costs/costs.component';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    HotelComponent,
    RoomsComponent,
    CostsComponent,
    ContactComponent
  ],
  exports: [
    HotelComponent,
    RoomsComponent,
    CostsComponent,
    ContactComponent
  ]
})
export class AboutModule { }
