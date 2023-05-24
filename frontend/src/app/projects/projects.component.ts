import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyService } from '../services/company.service'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  projects: any[] = [];
  companyId: number | null = null;

  constructor(
    private http: HttpClient,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    console.log("YO!")
    this.companyService.selectedCompanyId.subscribe((company) => {
      if (company) {
        this.companyId = company.id;
        this.fetchProjects();
      } else {
        this.companyId = null;
      }
    });
  }

  fetchProjects(): void {
    const companyId = 123; // Replace with your companyId
    const teamId = 456; // Replace with your teamId

    const url = `http://localhost:8080/company/${this.companyId}/teams/${teamId}/projects`;


    this.http.get<any[]>(url).subscribe(
      (response) => {
        this.projects = response;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  editProject(project: any): void {
    const companyId = 123; // Replace with your companyId
    const teamId = 456; // Replace with your teamId

    const url = `http://localhost:8080/${companyId}/teams/${teamId}/projects`;

    // Make your POST request with the updated project data
    this.http.post(url, project).subscribe(
      (response) => {
        console.log('Project updated successfully:', response);
      },
      (error) => {
        console.error('Error updating project:', error);
      }
    );
  }
}
