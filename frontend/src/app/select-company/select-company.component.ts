import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import Company from '../models/Company';

@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.css'],
})
export class SelectCompanyComponent {
  companies: Company[] = [];

  selectCompanyForm: FormGroup = new FormGroup({
    selectedCompany: new FormControl<Company | string>('', [
      Validators.required,
    ]),
  });

  constructor(
    private userData: UserService,
    private companyData: CompanyService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userData.loggedInUser.subscribe((user) => {
      if (user === null) {
        this.router.navigateByUrl('/');
      } else this.companies = user.companies;
    });
  }

  onSubmit(): void {
    this.companyData.updateselectedCompany(
      this.selectCompanyForm.controls['selectedCompany'].value
    );
    this.router.navigateByUrl('/announcements');
  }
}
