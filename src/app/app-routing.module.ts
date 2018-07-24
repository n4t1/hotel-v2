import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutModule } from './about/about.module';
import { NavigationRoutingModule } from './navigation/navigation-routing.module';
import { MainModule } from './main/main.module';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'hotel',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    AboutModule,
    MainModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingRoutingModule { }
