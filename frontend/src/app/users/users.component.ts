import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { CompanyService } from '../services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import User from '../models/User';
import { show } from '../overlay/helper';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  user: User | null = null;
  companyId: number = 0;
  employees: User[] = [];

  addUserForm: FormGroup = new FormGroup({
    firstName: new FormControl<string>("", [
      Validators.required,
      Validators.minLength(1),
    ]),
    lastName: new FormControl<string>("", [
      Validators.required,
      Validators.minLength(1),
    ]), 
   email: new FormControl<string>("", [
      Validators.required,
      Validators.minLength(1),
    ]),
    phone: new FormControl<string>("", [
      Validators.required,
      Validators.minLength(1),
    ]),
    password: new FormControl<string>("", [
      Validators.required,
      Validators.minLength(1),
    ]),
    confirmPassword: new FormControl<string>("", [
      Validators.required,
      Validators.minLength(1),
    ]),
    isAdmin: new FormControl<boolean>(false, [
      Validators.required,
    ]),
  });

  constructor(
    private userData: UserService,
    private companyData: CompanyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userData.loggedInUser.subscribe((user) => {
      if (!user) {
        this.router.navigateByUrl('/');
      } else this.user = user;
    });

    this.companyData.selectedCompany.subscribe((company) => {
      if (company) {
        this.companyId = company.id;
        this.loadCompanyEmployees(company.id);
      }
    });
  }

  async loadCompanyEmployees(companyId: number): Promise<void> {
    const response = await fetch(
      `http://localhost:8080/company/${companyId}/users`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => data);
    this.employees = response;
  }

  showAddUserModal() {
    show();
  }

  onAddUserFormSubmit(): void {
    if (this.companyId && this.user) {
      fetch(`http://localhost:8080/company/${this.companyId}/users`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credentials: {
            username: this.addUserForm.controls['firstName'].value,
            password: this.addUserForm.controls['password'].value
          },
          profile: {
            firstName: this.addUserForm.controls['firstName'].value,
            lastName: this.addUserForm.controls['lastName'].value,
            email: this.addUserForm.controls['email'].value,
            phone: this.addUserForm.controls['phone'].value,
          },
          admin: this.addUserForm.controls['isAdmin'].value,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Status: ${res.status}`);
          }
          return res.json();
        })
        .then(() => {
          this.loadCompanyEmployees(this.companyId);
        }); 
    }
  }
}
