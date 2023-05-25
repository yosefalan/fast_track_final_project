import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import User from '../models/User';
import Company from '../models/Company';
import Team from '../models/Team';
import { CompanyService } from '../services/company.service';
import { HttpClient } from '@angular/common/http';
import { ProjectsComponent } from '../projects/projects.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent {
  user: User | null = null;
  // company: Company | null = null;
  teamCards: any[] = [];
  projects: any[] = [];
  teamId: number | null = null;
  companyId: number | null = null;
  teams: any[] | undefined;
  userId: number | null = null;

  constructor(
    private router: Router,
    private userData: UserService,
    private companyData: CompanyService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.userData.loggedInUser.subscribe((user) => {
      this.user = user;
      this.teams = this.user?.teams;
      this.companyId = this.user?.companies[0].id ?? null;
      this.userId = user?.id ?? null;
    });
    this.fetchTeams();
    this.fetchTeamsAdmin();
  }

  fetchTeamsAdmin(): void {
    const companyId = this.companyId;
    const url = `http://localhost:8080/company/${companyId}/teams`;

    this.http.get<any[]>(url).subscribe(
      (response) => {
        this.teams = response;
        console.log('*******', response);
      },
      (error) => {
        console.error('Error fetching teams:', error);
      }
    );
  }

  fetchTeams(): void {
    console.log(this.user?.id);
    const userId = this.userId;
    console.log(typeof userId);

    const url = `http://localhost:8080/users/${userId}/teams`;

    this.http.get<any[]>(url).subscribe(
      (response) => {
        this.teams = response;
        console.log(response);
      },
      (error) => {
        console.error('Error fetching teams:', error);
      }
    );
  }
}
