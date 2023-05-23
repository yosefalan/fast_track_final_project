import { Component } from '@angular/core';
import { OverlayComponent } from '../overlay/overlay.component';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
})
export class AnnouncementsComponent {
  showNewAnnouncementModal() {
    console.log('show new announcement modal');
  }

  show(): void {
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'block';
    }
  }
}
