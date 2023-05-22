import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(12),
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(24),
    ]),
  });

  onSubmit(): void {
    //TO DO: call login endpoint
    //email: this.loginForm.controls['email'].value
    //password: this.login.controls["selectedGenre"].value
    //POST /login endpoint
    //if successful,
    //this.router.navigateByUrl("/select-company")
    //else,
    //Display Try Again error
  }
}
