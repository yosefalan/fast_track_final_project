import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyService } from '../services/company.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  @Input() teamName: string = '';
  @Input() isAdmin: boolean = true;
  @Input() projects: any[] = [];

  companyId: number | null = null;

  constructor(
    private http: HttpClient,
    private companyService: CompanyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log("YO!")
    this.companyService.selectedCompanyId.subscribe((company) => {

    });
  }

  createNewProject(): void {
    //TODO
    // // Replace {companyId} and {teamId} with the correct  IDs
    // const url = `http://localhost:8080/company/{companyId}/teams/{teamId}/projects`;

    // this.http.post(url, {}).subscribe(
    //   (response) => {
    //     const newProject = response;
    //   },
    //   (error) => {
    //     console.error('Error creating new project:', error);
    //   }
    // );
  }

  editProject(project: any): void {
    const companyId = 123; // Todo
    const teamId = 456; // Todo

    const url = `http://localhost:8080/${companyId}/teams/${teamId}/projects`;


    this.http.post(url, project).subscribe(
      (response) => {
        console.log('Project updated successfully:', response);
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
