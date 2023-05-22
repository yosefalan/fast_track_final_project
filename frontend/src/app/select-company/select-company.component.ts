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
    selectedCompany: new FormControl<number | null>(null, [
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
    this.userData.loggedInUserId.subscribe((userId) => {
      userId = 5;
      if (userId === null) {
        this.router.navigateByUrl('/');
      }
    });
    //TO DO: if not admin, display error and button to go back to login.
    this.loadCompanies();
  }

  loadCompanies(): void {
    //call API endpoint, set class variable
    this.companies = [
      { id: 1, name: 'FedEx', description: 'FedEx Description' },
      { id: 2, name: 'LQK', description: 'LQK Description' },
    ];
  }

  onSubmit(): void {
    this.companyData.updateSelectedCompanyId(
      this.selectCompanyForm.controls['selectedCompany'].value.id
    );
    this.router.navigateByUrl('/announcements');
  }
}
