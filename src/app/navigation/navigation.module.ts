import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationRoutingModule } from './navigation-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  imports: [
    CommonModule,
    NavigationRoutingModule,
    MDBBootstrapModule.forRoot(),
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent]
})
export class NavigationModule { }
