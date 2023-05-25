import { Component, Input } from '@angular/core';
import Announcement from 'src/app/models/Announcement';

@Component({
  selector: 'app-announcement-card',
  templateUrl: './announcement-card.component.html',
  styleUrls: ['./announcement-card.component.css'],
})
export class AnnouncementCardComponent {
  @Input() announcement: Announcement = {
    id: 0,
    date: new Date(),
    title: '',
    message: '',
    author: {
      id: 0,
      profile: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
      admin: false,
      active: false,
      status: '',
    },
  };
}
