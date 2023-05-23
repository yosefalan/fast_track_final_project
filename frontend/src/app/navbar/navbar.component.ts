import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAdmin: boolean = false;
  constructor(private router: Router, private userService: UserService) {
    //if user is admin, set isAdmin to true
  }

  show(): boolean {
    if (this.router.url === '/' || this.router.url === '/select-company') {
      return false;
    }
    else {
      return true;
    }
  }

  logout(): void {
    //call logout() from userService
  }
}
