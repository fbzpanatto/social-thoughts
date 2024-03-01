import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ChangeDetectorRef, OnInit } from '@angular/core';

import { BreakpointObserver, MediaMatcher } from "@angular/cdk/layout";

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css', '../../styles/generic.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements OnInit {


  isLargeScreen = false;
  isMediumScreen = false;
  isSmallScreen = true;

  mobileQuery!: MediaQueryList;

  private readonly _mobileQueryListener: (() => void) | undefined;


  constructor(
    private responsive: BreakpointObserver,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 960px)')
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener)
  }

  ngOnInit(): void {
    this.setBreakpointObserver();
  }

  setBreakpointObserver() {

    const minWidth720 = '(min-width: 720px)'
    const minWidth960 = '(min-width: 960px)'

    this.responsive
      .observe([ minWidth720, minWidth960 ])
      .subscribe(result => {
        const breakpoints = result.breakpoints;

        this.isLargeScreen = breakpoints[minWidth960];
        this.isMediumScreen = !this.isLargeScreen && breakpoints[minWidth720];
        this.isSmallScreen = !this.isLargeScreen && this.isMediumScreen;
      });
  }

}
