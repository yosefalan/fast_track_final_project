import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-input',
  templateUrl: './login-input.component.html',
  styleUrls: ['./login-input.component.css'],
})
export class LoginInputComponent {
  @Input() control: FormControl = new FormControl();
  @Input() label: string = '';

  constructor() {}
}
