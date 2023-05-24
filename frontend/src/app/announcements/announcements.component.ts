import { Component } from '@angular/core';
import { OverlayComponent } from '../overlay/overlay.component';
import { show } from '../overlay/helper';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import User from '../models/User';
import { UserService } from '../services/user.service';
import { CompanyService } from '../services/company.service';
import Announcement from '../models/Announcement';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
})
export class AnnouncementsComponent {
  user: User | null = null;
  companyId: number = 0;
  announcements: Announcement[] = [];

  newAnnouncementForm: FormGroup = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    message: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });

  constructor(
    private router: Router,
    private userData: UserService,
    private companyData: CompanyService
  ) {}

  ngOnInit(): void {
    this.userData.loggedInUser.subscribe((user) => {
      if (!user) {
        this.router.navigateByUrl('/');
      } else this.user = user;
    });

    this.companyData.selectedCompany.subscribe((company) => {
      if (company) {
        this.companyId = company.id;
        this.loadCompanyAnnouncements(company.id);
      }
    });
  }

  async loadCompanyAnnouncements(companyId: number): Promise<void> {
    const response = await fetch(
      `http://localhost:8080/company/${companyId}/announcements`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => data);
    this.announcements = response;
  }

  showNewAnnouncementModal() {
    show();
  }

  onNewAnnouncementFormSubmit(): void {
    if (this.companyId && this.user) {
      fetch(`http://localhost:8080/company/${this.companyId}/announcements`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authorId: this.user.id,
          title: this.newAnnouncementForm.controls['title'].value,
          message: this.newAnnouncementForm.controls['message'].value,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Status: ${res.status}`);
          }
          return res.json();
        })
        .then(() => {
          this.loadCompanyAnnouncements(this.companyId);
        });
    }
  }
}
