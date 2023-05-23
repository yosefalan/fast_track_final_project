import { Component } from '@angular/core';
import { OverlayComponent } from '../overlay/overlay.component';
import { show } from '../overlay/helper';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
})
export class AnnouncementsComponent {
  showNewAnnouncementModal() {
    console.log('show new announcement modal');
    show();
  }
}
