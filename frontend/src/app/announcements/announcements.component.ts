import { Component } from '@angular/core';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
})
export class AnnouncementsComponent {
  showNewAnnouncementModal() {
    console.log('show new announcement modal');
  }
}
