import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import User from '../models/User';
import Company from '../models/Company';
import Team from '../models/Team';
import { CompanyService } from '../services/company.service';
import { HttpClient } from '@angular/common/http';
import { ProjectsComponent } from '../projects/projects.component'


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})

export class TeamsComponent {
  user: User | null = null;
  company: Company | null = null;
  teamCards: any[] = [];
  projects: any[] = [];
  teamId: number = 11;
  companyId: number = 6;

  constructor(
    private router: Router,
    private userData: UserService,
    private companyData: CompanyService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.companyData.selectedCompanyId.subscribe((company) => {
      this.company = company;
    });
    this.userData.loggedInUser.subscribe((user) => {
      this.user = user;
      if (user === null) {
        this.router.navigateByUrl('/');
      } else if (user.admin === false) {
        this.showWorkerTeams();
      } else if (user.admin) {
        this.showAdminTeams();
      }
    });
    this.fetchProjects();
  }

  showWorkerTeams(): void {
    let numTeams = this.user?.teams.length || 0;
    for (let i = 0; i < numTeams; i++) {
      const teamCard: any = {
        name: '',
        numProjects: Number, //how to get this? there is an endpoint in companycontroller that gets all projects, but we really just need a number. maybe just add that property to the entity + model: numProjects
        teammates: [],
      };
      teamCard.name = this.user?.teams[i].name;
      teamCard.numProjects = 0;
      teamCard.teammates = this.user?.teams[i].teammates;
      this.teamCards.push(teamCard);
    }
  }

  showAdminTeams(): void {
    // fetch all teams for the given company
    // create a card for each team (same as showWorkerTeams())
    // show a new team button that opens a modal component
  }

  fetchProjects(): void {
    if (!this.company || !this.user) {
      return;
    }

    const teamId = this.teamId; // Replace with the actual team ID
    const companyId = this.companyId; // Replace with the actual company ID

    const url = `http://localhost:8080/company/${companyId}/teams/${teamId}/projects`;

    this.http.get<any[]>(url).subscribe(
      (response) => {
        this.projects = response;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }
}
