import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import User from '../models/User';
import Company from '../models/Company';
import Team from '../models/Team';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  user: User | null = null;
  company: Company | null = null;
  teamCards: any[] = [];

  constructor(private router: Router, private userData: UserService, private companyData: CompanyService) {}

  ngOnInit(): void {
    this.companyData.selectedCompany.subscribe((company) => {
      this.company = company;
    });
    this.userData.loggedInUser.subscribe((user) => {
      this.user = user;
      if (user === null) {
        this.router.navigateByUrl('/');
      }
      else if (user.admin === false) {
        this.showWorkerTeams();
      }
      else if (user.admin) {
        this.showAdminTeams();
      }
    });
  }

  showWorkerTeams(): void {
    let numTeams = this.user?.teams.length || 0;
    for (let i = 0; i < numTeams; i++) {
      const teamCard: any = {
        name: "",
        numProjects: Number, //how to get this? there is an endpoint in companycontroller that gets all projects, but we really just need a number. maybe just add that property to the entity + model: numProjects
        teammates: []
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

}
