import { Component, input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-async-page',
  templateUrl: './async-page.component.html',
  styleUrls: ['./async-page.component.scss'],
  imports: [MatProgressSpinner],
})
export class AsyncPageComponent {
  public showSpinner = input.required<boolean>();
}
