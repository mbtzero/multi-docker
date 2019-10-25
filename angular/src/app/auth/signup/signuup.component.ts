import { Component } from "@angular/core";
import { AuthService } from "../auth.service";
import { NgForm } from "@angular/forms";


@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignuupComponent {
  constructor(public authService: AuthService) {}

  onSignup(form: NgForm) {
    this.authService.addUser(form.value.email, form.value.password);
  }
}
