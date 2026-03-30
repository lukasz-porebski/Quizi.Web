import type { OnInit } from '@angular/core';
import { Component, effect, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, RouterOutlet } from '@angular/router';
import { Route } from '@app/core/enums/route.enum';
import { AsyncPageComponent, AuthenticationService } from 'lp-common';

@Component({
  selector: 'app-root',
  imports: [AsyncPageComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly _authenticationService = inject(AuthenticationService);

  public isLoading = true;

  constructor() {
    const translate = inject(TranslateService);
    const router = inject(Router);

    translate.use('pl');

    effect(async () => {
      await router.navigate([this._authenticationService.isUserLoggedIn() ? Route.Quizzes : Route.Login]);
    });
  }

  public async ngOnInit(): Promise<void> {
    await this._authenticationService.refresh().finally(() => (this.isLoading = false));
  }
}
