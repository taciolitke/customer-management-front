import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from '../shared/login.model';
import { LoginService } from '../shared/login.service';
import { UserModel } from '../shared/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { CustomValidator } from 'src/app/shared/helpers/custom.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  emailControl: FormControl;
  passwordControl: FormControl;
  messageError: string;

  constructor(
    private loginService: LoginService, private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.verifyLogged();
    this.buildForm();
  }
  verifyLogged() {
    this.authService.isLogged().subscribe(result => {
      if (result.success) {
        this.redirect();
      }
    }, () => {
      this.authService.setCurrentUser(undefined);
    });
  }

  login() {

    if (!this.form.valid) {
      this.form.markAsTouched();
      return;
    }

    this.messageError = '';

    const login = LoginModel.Create(this.emailControl.value, this.passwordControl.value);

    this.form.disable();

    this.loginService.login(login).subscribe(result => {
      if (result.success) {
        this.loginSuccess(result.data);
      } else {
        this.loginFail(result.message);
      }
      this.form.enable();
    });
  }

  private buildForm() {
    this.emailControl = new FormControl('', Validators.required);
    this.passwordControl = new FormControl('', Validators.required);

    this.form = new FormGroup({
      emailControl: this.emailControl,
      passwordControl: this.passwordControl
    });
  }

  private loginSuccess(data: UserModel) {
    localStorage.setItem('currentUser', JSON.stringify(data));
    this.authService.setCurrentUser(data);
    this.redirect();

  }
  private loginFail(message: string) {
    this.messageError = message;
  }
  private redirect() {
    const routeRedirect = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigate([routeRedirect]);
  }
}
