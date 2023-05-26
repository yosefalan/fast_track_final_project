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
  projectId: number | null = null;
  company: Company | null = null;
  user: User | null = null;
  mode: string = '';

  editProjectForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    description: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    active: new FormControl<boolean>(true),
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
      this.companyId = company?.id ?? null;
    });
    this.userService.loggedInUser.subscribe((user) => {
      this.user = user;
    });
    const selectedTeam = this.company?.teams.find(
      (team) => team.id === this.teamId
    );
    if (selectedTeam) {
      this.teamName = selectedTeam.name;
    }
    this.fetchProjects();
  }

  fetchProjects(): void {
    const teamId = this.teamId;
    const companyId = this.companyId;
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

  showProjectModal(mode: string, projectId: number) {
    this.editProjectForm.reset();
    this.mode = mode;
    this.projectId = projectId;
    if (mode === 'edit' && projectId) {
      const project = this.projects.find((proj) => proj.id === projectId);
      if (project) {
        this.editProjectForm.patchValue({
          name: project.name,
          description: project.description,
          active: project.active,
        });
      }
    }

    show();
  }

  projectFormSubmit(): void {
    if (this.editProjectForm.valid) {
      const formData = {
        name: this.editProjectForm.get('name')?.value,
        description: this.editProjectForm.get('description')?.value,
        active:
          this.mode === 'edit'
            ? this.editProjectForm.get('active')?.value
            : true,
      };
      console.log('FORM SUBMIT', formData);
      if (this.mode === 'edit') {
        this.editProject(formData);
      }

      if (this.mode === 'new') {
        this.createNewProject(formData);
      }
    }
  }

  createNewProject(project: any): void {
    const companyId = this.companyId;
    const teamId = this.teamId;

    const url = `http://localhost:8080/company/${companyId}/teams/${teamId}/projects`;

    this.http.post(url, project).subscribe(
      (response) => {
        console.log('Project created successfully:', response);

        hide();
      },
      (error) => {
        console.error('Error creating project:', error);
      }
    );
  }

  editProject(project: any): void {
    const companyId = this.companyId;
    const teamId = this.teamId;
    const projectId = this.projectId;

    const url = `http://localhost:8080/company/${companyId}/teams/${teamId}/projects/${projectId}`;

    this.http.patch(url, project).subscribe(
      (response) => {
        console.log('PATCH REQ');
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
