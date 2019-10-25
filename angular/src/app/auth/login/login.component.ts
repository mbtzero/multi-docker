import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public authService: AuthService) {}

  onLogin(form: NgForm) {
    this.authService.loginUser(form.value.email, form.value.password);
  }
}

