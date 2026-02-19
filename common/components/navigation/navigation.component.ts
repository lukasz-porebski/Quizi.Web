import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { NavigationMenuFirstLevelConfig } from '@common/components/navigation/models/menu-first-level.config';
import { NavigationMenuSecondLevelConfig } from '@common/components/navigation/models/menu-second-level.config';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { isDefined, isEmpty } from '@common/utils/utils';
import { NavigationMenuThirdLevelConfig } from '@common/components/navigation/models/menu-third-level.config';
import { Subscription } from 'rxjs';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { NavigationConfig } from '@common/components/navigation/models/navigation.config';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthenticationService } from '@common/identity/services/authentication.service';
import { NgOptimizedImage } from '@angular/common';
import { HasPermissionDirective } from '@common/identity/directives/has-permission.directive';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  imports: [
    MatSidenavContainer,
    MatSidenavContent,
    MatExpansionPanelTitle,
    MatSidenav,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatIcon,
    MatToolbar,
    RouterLink,
    MatAnchor,
    MatIconButton,
    TranslatePipe,
    NgOptimizedImage,
    HasPermissionDirective,
  ],
})
export class NavigationComponent implements OnInit, OnDestroy {
  public config = input.required<NavigationConfig>();

  public readonly expandedHeight = '48px';

  private readonly _subscription = new Subscription();

  public constructor(
    public readonly authenticationService: AuthenticationService,
    private readonly _router: Router,
  ) {}

  public ngOnInit(): void {
    this._setActiveMenuElements(this._router.url);

    const sub = this._router.events.subscribe((navEvent) => {
      if (navEvent instanceof NavigationEnd) {
        this._setActiveMenuElements(navEvent.urlAfterRedirects);
      }
    });

    this._subscription.add(sub);
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public onClickNotLastLevel(
    tLevel: MatExpansionPanelHeader,
    menuLevel: NavigationMenuFirstLevelConfig | NavigationMenuSecondLevelConfig,
  ): void {
    if (isEmpty(menuLevel.nextLevels)) {
      tLevel._toggle();
      this._router.navigateByUrl(menuLevel.navigateUrl!);
    }
  }

  public onClickLastLevel(tLevel: MatExpansionPanelHeader, menuLevel: NavigationMenuThirdLevelConfig): void {
    tLevel._toggle();
    this._router.navigateByUrl(menuLevel.navigateUrl!);
  }

  public navigateToHome(): void {
    this._router.navigateByUrl('/');
  }

  private _setActiveMenuElements(url: string): void {
    if (isEmpty(url)) {
      return;
    }

    this.config().menu.forEach((m) => {
      m.isActive = isDefined(m.navigateUrl) ? url.includes(m.navigateUrl) : false;

      m.nextLevels?.forEach((nl) => {
        nl.isActive = isDefined(nl.navigateUrl) ? url.includes(nl.navigateUrl) : false;

        nl.nextLevels?.forEach((ll) => {
          ll.isActive = isDefined(ll.navigateUrl) ? url.includes(ll.navigateUrl) : false;
        });
      });
    });
  }
}
