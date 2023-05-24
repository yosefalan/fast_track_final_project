import { Component } from '@angular/core';
import { OverlayComponent } from '../overlay/overlay.component';
import { show } from '../overlay/helper';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import User from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
})
export class AnnouncementsComponent {
  user: User | null = null;

  newAnnouncementForm: FormGroup = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    description: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });

  constructor(private router: Router, private userData: UserService) {}

  ngOnInit(): void {
    this.userData.loggedInUser.subscribe((user) => {
      if (user === null) {
        this.router.navigateByUrl('/');
      } else this.user = user;
    });
  }

  showNewAnnouncementModal() {
    console.log('show new announcement modal');
    show();
  }

  onNewAnnouncementFormSubmit(): void {
    fetch('http://localhost:8080/6/announcements', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.user?.profile.firstName,
        text: this.newAnnouncementForm.controls['title'].value,
        description: this.newAnnouncementForm.controls['description'].value,
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
      });
  }
}
