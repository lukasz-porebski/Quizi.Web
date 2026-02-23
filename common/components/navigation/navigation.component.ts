import type { AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Component, effect, inject, Injector, input, viewChild } from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { isDefined, isEmpty } from '@common/utils/utils';
import { Subscription } from 'rxjs';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import type { NavigationConfig } from '@common/components/navigation/models/navigation.config';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthenticationService } from '@common/identity/services/authentication.service';
import { NgOptimizedImage } from '@angular/common';
import { HasPermissionDirective } from '@common/identity/directives/has-permission.directive';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import type { NavigationBaseMenuLevelConfig } from '@common/components/navigation/models/base-menu-level.config';
import type { Optional } from '@common/types/optional.type';
import { ViewportService } from '@common/services/viewport.service';

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
export class NavigationComponent implements OnInit, AfterViewInit, OnDestroy {
  public readonly config = input.required<NavigationConfig>();

  private readonly _snav = viewChild.required<MatSidenav>('snav');

  public readonly authenticationService = inject(AuthenticationService);

  private readonly _router = inject(Router);
  private readonly _breakpointObserver = inject(BreakpointObserver);
  private readonly _injector = inject(Injector);
  private readonly _viewportService = inject(ViewportService);

  public readonly isMobile = this._viewportService.isMobile;
  public readonly expandedHeight = '48px';

  private readonly _subscription = new Subscription();

  public ngOnInit(): void {
    this._setActiveMenuElements(this._router.url);

    const sub = this._router.events.subscribe((navEvent) => {
      if (navEvent instanceof NavigationEnd) {
        this._setActiveMenuElements(navEvent.urlAfterRedirects);
      }
    });

    this._subscription.add(sub);
  }

  public ngAfterViewInit(): void {
    effect(
      async () => {
        if (!this.isMobile()) {
          await this._snav().open();
        }
      },
      { injector: this._injector },
    );
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public async onMenuHeaderClick(menuLevel: NavigationBaseMenuLevelConfig, snav: MatSidenav): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hasNextLevels = !isEmpty((menuLevel as any).nextLevels);

    if (!hasNextLevels && isDefined(menuLevel.navigateUrl)) {
      if (this._breakpointObserver.isMatched([Breakpoints.Handset, Breakpoints.Tablet])) {
        await snav.close();
      }
      await this._router.navigateByUrl(menuLevel.navigateUrl);
    }
  }

  public async navigateToHome(): Promise<void> {
    await this._router.navigateByUrl('/');
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this._setMenuLevelActive((level as any).nextLevels, url);
    });
  }
}
