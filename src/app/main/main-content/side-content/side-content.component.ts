import { Component, OnInit, Input } from '@angular/core';
import { LoginComponent } from '../../../auth/login/login.component';
import { AngularFireauthService } from '../../../shared/services/angular-fireauth.service';
import { PanelComponent } from '../../../reservations/panel/panel.component';

@Component({
  selector: 'app-side-content',
  templateUrl: './side-content.component.html',
  styleUrls: ['./side-content.component.scss']
})
export class SideContentComponent implements OnInit {

  @Input() loginModal: LoginComponent;
  @Input() reservationModal: PanelComponent;

  constructor(public auth: AngularFireauthService) { }

  ngOnInit() {}

  openLoginDialog() {
    this.loginModal.showModal();
  }

  openReservationDialog() {
    this.reservationModal.showModal();
  }

  logout() {
    this.auth.logout();
  }
}
