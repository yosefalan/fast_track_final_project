import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from "@angular/router"
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAdmin: boolean = true;
  constructor(private router: Router, private userService: UserService, private companyData: CompanyService) {
    //if user is admin, set isAdmin to true
  }

  ngOnInit(): void {
    this.userService.loggedInUser.subscribe((user) => {
      if (user === null) {
        this.router.navigateByUrl('/');
      } else if(user.admin){
          this.isAdmin = true;
      }
      else if(!user.admin){
        this.isAdmin = false;
      }
    });
  }

  logout(): void {
    //call logout() from userService
  }
}
