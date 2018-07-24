import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainContentComponent } from './main-content/main-content.component';
import { SideContentComponent } from './main-content/side-content/side-content.component';
import { CenterContentComponent } from './main-content/center-content/center-content.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthModule } from '../auth/auth.module';
import { NavigationModule } from '../navigation/navigation.module';

import { ReservationsModule } from '../reservations/reservations.module';
import { MaterialModule } from '../shared/module/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    MDBBootstrapModule.forRoot(),
    AuthModule,
    NavigationModule,
    ReservationsModule,
    MaterialModule
  ],
  declarations: [
    MainContentComponent,
    SideContentComponent,
    CenterContentComponent,
  ],
  exports: [MainContentComponent]
})
export class MainModule { }
