import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(0),
      Validators.maxLength(12),
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(0),
      Validators.maxLength(24),
    ]),
  });

  constructor(private router: Router, private userData: UserService) {}

  onSubmit(): void {
    //TO DO: call POST login endpoint
    //email: this.loginForm.controls['email'].value
    //password: this.login.controls["selectedGenre"].value
    //POST /login endpoint
    //if successful,
    // this.userData.updateLoggedInUserId();
    this.router.navigateByUrl('/select-company');
    //else,
    //Display Try Again error
  }
}
