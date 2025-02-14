import { Component, input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-async-page',
  templateUrl: './async-page.component.html',
  styleUrls: [ './async-page.component.scss' ],
  imports: [
    CommonModule,
    MatProgressSpinner
  ]
})
export class AppAsyncPageComponent {
  public showSpinner = input.required<boolean>;
}
