import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AsyncPageComponent } from '@common/components/async-page/async-page.component';
import { AuthenticationService } from '@common/identity/services/authentication.service';
import { AuthenticatedComponent } from '@app/core/components/authenticated/authenticated.component';
import { LoginComponent } from '@app/modules/identity/pages/login/login.component';

@Component({
  selector: 'app-root',
  imports: [AsyncPageComponent, AuthenticatedComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public isLoading = true;

  public constructor(
    private readonly _translate: TranslateService,
    public readonly authenticationService: AuthenticationService,
  ) {
    this._translate.addLangs(['pl']);
    this._translate.setDefaultLang('pl');
    this._translate.use('pl');
  }

  public async ngOnInit(): Promise<void> {
    await this.authenticationService.refresh().finally(() => (this.isLoading = false));
  }
}
