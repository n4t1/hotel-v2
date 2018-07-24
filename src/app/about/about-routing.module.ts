import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotelComponent } from './hotel/hotel.component';
import { RoomsComponent } from './rooms/rooms.component';
import { CostsComponent } from './costs/costs.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path: 'hotel',
    component: HotelComponent
  },
  {
    path: 'rooms',
    component: RoomsComponent
  },
  {
    path: 'costs',
    component: CostsComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
