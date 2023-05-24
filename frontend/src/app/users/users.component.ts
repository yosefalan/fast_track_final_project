import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { CompanyService } from '../services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import Company from '../models/Company';
import BasicUser from '../models/BasicUser';
import Profile from '../models/Profile';
import User from '../models/User';
import Team from '../models/Team';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})


export class UsersComponent {
  company: Company | null = null;
  employees: User[] = [];
  profile: Profile | null = null;
  firstname: String = "";
  //teams: Team[] = [];
  

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
      } 
    });

    this.companyData.selectedCompanyId.subscribe((company) => {
      if (company === null || company.employees === null){
        this.router.navigateByUrl('/');
      }
      else {
      this.company = company;
      this.employees = company.employees

      }
    });

  }
}
