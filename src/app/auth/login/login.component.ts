import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireauthService } from '../../shared/services/angular-fireauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('form')
  private loginModal: ModalDirective;

  loginForm: FormGroup;

  constructor(private authService: AngularFireauthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  login() {
    this.authService.login(
      this.loginForm.get('email').value,
      this.loginForm.get('password').value
    );
    this.loginModal.hide();
  }

  signUp() {
    this.authService.signUp(
      this.loginForm.get('email').value,
      this.loginForm.get('password').value
    );
    this.loginModal.hide();
  }

  showModal() {
    this.loginModal.show();
  }
}
