import { Component } from '@angular/core';
import { hide } from './helper';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css'],
})
export class OverlayComponent {
  hide = hide;
}
