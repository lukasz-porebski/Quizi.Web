import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { isDefined, isEmpty } from '@common/utils/utils';
import { map, Observable, Subscription } from 'rxjs';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { NavigationConfig } from '@common/components/navigation/models/navigation.config';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthenticationService } from '@common/identity/services/authentication.service';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { HasPermissionDirective } from '@common/identity/directives/has-permission.directive';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NavigationBaseMenuLevelConfig } from '@common/components/navigation/models/base-menu-level.config';
import { Optional } from '@common/types/optional.type';

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
    AsyncPipe,
  ],
})
export class NavigationComponent implements OnInit, OnDestroy {
  public config = input.required<NavigationConfig>();

  public readonly authenticationService = inject(AuthenticationService);
  public readonly expandedHeight = '48px';
  public readonly isMobile$: Observable<boolean>;

  private readonly _subscription = new Subscription();

  private readonly _router = inject(Router);
  private readonly _breakpointObserver = inject(BreakpointObserver);

  public constructor() {
    this.isMobile$ = this._breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .pipe(map((result) => result.matches));
  }

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

  public onMenuHeaderClick(menuLevel: NavigationBaseMenuLevelConfig, snav: MatSidenav): void {
    const hasNextLevels = !isEmpty((menuLevel as any).nextLevels);

    if (!hasNextLevels && isDefined(menuLevel.navigateUrl)) {
      if (this._breakpointObserver.isMatched([Breakpoints.Handset, Breakpoints.Tablet])) {
        snav.close();
      }
      this._router.navigateByUrl(menuLevel.navigateUrl);
    }
  }

  public navigateToHome(): void {
    this._router.navigateByUrl('/');
  }

  private _setActiveMenuElements(url: string): void {
    if (isEmpty(url)) {
      return;
    }
    this._setMenuLevelActive(this.config().menu, url);
  }

  private _setMenuLevelActive(levels: Optional<NavigationBaseMenuLevelConfig[]>, url: string): void {
    levels?.forEach((level) => {
      level.isActive = isDefined(level.navigateUrl) ? url.includes(level.navigateUrl) : false;
      this._setMenuLevelActive((level as any).nextLevels, url);
    });
  }
}
