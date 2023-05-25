import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyService } from '../services/company.service';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { show, hide } from '../overlay/helper';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Company from '../models/Company';
import User from '../models/User';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  teamName: string = '';
  projects: any[] = [];

  companyId: number | null = null;
  teamId: number | null = null;
  company: Company | null = null;
  user: User | null = null;

  editProjectForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    description: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    active: new FormControl<boolean>(true)
  });

  constructor(
    private http: HttpClient,
    private companyService: CompanyService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.teamId = Number(params['teamId']);
    });
    this.companyService.selectedCompany.subscribe((company) => {
      this.company = company;
      console.log('Company:', this.company);
      this.companyId = company?.id ?? null;
    });
    this.userService.loggedInUser.subscribe((user) => {
      this.user = user;
      console.log('Logged-in User:', this.user);
    });
    const selectedTeam = this.company?.teams.find(team => team.id === this.teamId);
    if (selectedTeam) {
      this.teamName = selectedTeam.name;
      console.log('Selected Team Name:', this.teamName);
    }
    this.fetchProjects();
  }

  createNewProject(project: any): void {
    const companyId = this.companyId;
    const teamId = this.teamId;

    const url = `http://localhost:8080/company/${companyId}/teams/${teamId}/projects`;

    this.http.post(url, project).subscribe(
      (response) => {
        console.log('Project updated successfully:', response);

        hide();
      },
      (error) => {
        console.error('Error updating project:', error);
      }
    );
  }

  fetchProjects(): void {
    const teamId = this.teamId;
    const companyId = this.companyId;
    console.log('Team ID:', this.teamId, teamId, companyId);
    const url = `http://localhost:8080/company/${companyId}/teams/${teamId}/projects`;
    this.http.get<any[]>(url).subscribe(
      (response) => {
        this.projects = response;
        console.log(this.projects);
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  showProjectModal(){
    show();
  }

 projectFormSubmit(): void {
  if (this.editProjectForm.valid) {
    const formData = {
      name: this.editProjectForm.get('name')?.value,
      description: this.editProjectForm.get('description')?.value,
      active: this.editProjectForm.get('active')?.value,
    };
    console.log("FORM DATA", formData)
    this.editProject(formData);
  }
}

  editProject(project: any): void {
    const companyId = this.companyId;
    const teamId = this.teamId;

    const url = `http://localhost:8080/company/${companyId}/teams/${teamId}/projects`;

    this.http.patch(url, project).subscribe(
      (response) => {
        console.log('Project updated successfully:', response);

        hide();
      },
      (error) => {
        console.error('Error updating project:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/teams']);
  }
}
