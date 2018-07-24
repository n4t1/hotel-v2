import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { AngularFireauthService } from '../../shared/services/angular-fireauth.service';
import { LoginComponent } from '../../auth/login/login.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  @Input() loginModal: LoginComponent;
  @ViewChild('reservationModal')
  private reservationModal: ModalDirective;

  spinner = false;
  openUserBooks = false;

  constructor(public auth: AngularFireauthService) { }

  ngOnInit() { }

  showModal() {
    this.reservationModal.show();
  }

  openLoginDialog() {
    this.reservationModal.hide();
    this.loginModal.showModal();
  }
}
