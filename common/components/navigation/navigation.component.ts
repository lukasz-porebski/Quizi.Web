import {
  AfterViewInit,
  Component,
  effect,
  inject,
  Injector,
  input,
  OnDestroy,
  OnInit,
  viewChild,
} from '@angular/core';
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
import { NavigationConfig } from '@common/components/navigation/models/navigation.config';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthenticationService } from '@common/identity/services/authentication.service';
import { NgOptimizedImage } from '@angular/common';
import { HasPermissionDirective } from '@common/identity/directives/has-permission.directive';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NavigationBaseMenuLevelConfig } from '@common/components/navigation/models/base-menu-level.config';
import { Optional } from '@common/types/optional.type';
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
  private readonly _snav = viewChild.required<MatSidenav>('snav');

  public readonly config = input.required<NavigationConfig>();

  public readonly authenticationService = inject(AuthenticationService);

  private readonly _router = inject(Router);
  private readonly _breakpointObserver = inject(BreakpointObserver);
  private readonly _subscription = new Subscription();
  private readonly _injector = inject(Injector);
  private readonly _viewportService = inject(ViewportService);

  public readonly isMobile = this._viewportService.isMobile;
  public readonly expandedHeight = '48px';

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
      () => {
        if (!this.isMobile()) {
          this._snav().open();
        }
      },
      { injector: this._injector },
    );
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
