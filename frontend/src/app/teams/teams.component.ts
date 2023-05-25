import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import User from '../models/User';
import Company from '../models/Company';
import Team from '../models/Team';
import { CompanyService } from '../services/company.service';
import { HttpClient } from '@angular/common/http';
import { ProjectsComponent } from '../projects/projects.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import BasicUser from '../models/BasicUser';
import { show } from '../overlay/helper';


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent {
  user: User | null = null;
  company: Company | null = null;
  teamId: number | null = null;
  userId: number | null = null;
  companyId: number | null = null;
  teams: any[] = [];
  projectCountsPerTeam: { [teamId: number]: number } = {};
  

  availableMembers: BasicUser[] = [];
  selectedMembers: BasicUser[] = [];

  newTeamForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    description: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    members: new FormControl<string[]>([]),
  });

 

  constructor(
    private router: Router,
    private userData: UserService,
    private companyData: CompanyService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.companyData.selectedCompany.subscribe((company) => {
      this.company = company;
      if (company) {
        this.companyId = company.id;
      }
    });

    this.userData.loggedInUser.subscribe((user) => {
      this.user = user;
      if (user === null) {
        this.router.navigateByUrl('/');
      }
      else {
        this.userId = user.id;
        if (user.admin === false) {
          this.fetchWorkerTeams();
        }
        else if (user.admin === true) {
          this.fetchAdminTeams();
        }
      }
    });
  }

  fetchAdminTeams(): void {
    const url = `http://localhost:8080/company/${this.companyId}/teams`;

    this.http.get<any[]>(url).subscribe(
      (response) => {
        this.teams = response;
        this.fetchProjectCounts();
        this.fetchAvailableMembers();
      },
      (error) => {
        console.error('Error fetching teams:', error);
      }
    );
  }

  fetchWorkerTeams(): void {
    const url = `http://localhost:8080/users/${this.userId}/teams`;

    this.http.get<any[]>(url).subscribe(
      (response) => {
        this.teams = response;
        this.fetchProjectCounts();
      },
      (error) => {
        console.error('Error fetching teams:', error);
      }
    );
  }

  fetchProjectCounts(): void {
    for (let team of this.teams) {
      const url = `http://localhost:8080/company/${this.companyId}/teams/${team.id}/projects`;

      this.http.get<any[]>(url).subscribe(
        (response) => {
          this.projectCountsPerTeam[team.id] = response.length;
        },
        (error) => {
          console.error('Error fetching projects:', error);
        }
      );
    }
  }

  fetchAvailableMembers(): void {
    const url = `http://localhost:8080/company/${this.companyId}/users`;

    this.http.get<any[]>(url).subscribe(
      (response) => {
        this.availableMembers = response;
      },
      (error) => {
        console.error('Error fetching teams:', error);
      }
    );
  }

  updateSelectedMembers(): void {
    const selectedMemberIds = this.newTeamForm.value.members;
    this.selectedMembers = this.availableMembers.filter(
      (member) => selectedMemberIds.includes(member.id)
    );
  }

  removeSelectedMember(memberId: number): void {
    const selectedMemberIds = this.newTeamForm.value.members;
    const index = selectedMemberIds.indexOf(memberId);
    if (index !== -1) {
      selectedMemberIds.splice(index, 1);
      this.selectedMembers = this.selectedMembers.filter(
        (member) => member.id !== memberId
      );
    }
  }

  showNewTeamModal(): void {
    console.log("show new team form modal");
    show();
  }

  onNewTeamFormSubmit(): void {
    if (this.companyId) {
      fetch(`http://localhost:8080/company/${this.companyId}/teams`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.newTeamForm.get('name')?.value,
        description: this.newTeamForm.get('description')?.value,
        teammateIds: this.newTeamForm.get('members')?.value,
      }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error('Error creating team:', error);
        });
    }
  }


}
