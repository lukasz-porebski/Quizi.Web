import { Component, effect, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AsyncPageComponent } from '@common/components/async-page/async-page.component';
import { AuthenticationService } from '@common/identity/services/authentication.service';
import { Router, RouterOutlet } from '@angular/router';
import { Route } from '@app/core/enums/route.enum';

@Component({
  selector: 'app-root',
  imports: [AsyncPageComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public isLoading = true;

  private readonly _authenticationService = inject(AuthenticationService);

  constructor() {
    const translate = inject(TranslateService);
    const router = inject(Router);

    translate.addLangs(['pl']);
    translate.setDefaultLang('pl');
    translate.use('pl');

    effect(() => {
      router.navigate([this._authenticationService.isUserLoggedIn() ? Route.Quizzes : Route.Login]);
    });
  }

  public async ngOnInit(): Promise<void> {
    await this._authenticationService.refresh().finally(() => {
      this.isLoading = false;
    });
  }
}
