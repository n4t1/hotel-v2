import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { PanelComponent } from './panel/panel.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MaterialModule } from '../shared/module/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomDataComponent } from './panel/room-data/room-data.component';
import { UserDataComponent } from './panel/user-data/user-data.component';

@NgModule({
  imports: [
    CommonModule,
    ReservationsRoutingModule,
    MDBBootstrapModule.forRoot(),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PanelComponent,
    RoomDataComponent,
    UserDataComponent
  ],
  exports: [PanelComponent],
})
export class ReservationsModule { }
