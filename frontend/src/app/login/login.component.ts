import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import User from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: User | null = null;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });

  constructor(private router: Router, private userData: UserService) {}

  ngOnInit(): void {
    this.userData.loggedInUser.subscribe((user) => {
      this.user = user;
    });
  }
  
  onSubmit(): void {
    fetch('http://localhost:8080/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.loginForm.controls['username'].value,
        password: this.loginForm.controls['password'].value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.userData.updateLoggedInUser(data);
        if (data.admin) {
          this.router.navigateByUrl('/select-company');
        } else {
          this.router.navigateByUrl('/announcements');
        }
      });
  }
}
