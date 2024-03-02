import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ChangeDetectorRef, OnInit, signal } from '@angular/core';

import { BreakpointObserver, MediaMatcher } from "@angular/cdk/layout";

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css', '../../styles/generic.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements OnInit {

  minWidth728 = false
  maxWidth728 = true
  condition = signal(true)

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

  ngOnInit(): void { this.setBreakpointObserver() }

  setBreakpointObserver() {

    const minWidth728 = '(min-width: 728px)'
    const maxWidth728 = '(max-width: 728px)'

    this.responsive
      .observe([minWidth728, maxWidth728])
      .subscribe(result => {
        const breakpoints = result.breakpoints;

        this.minWidth728 = breakpoints[minWidth728];
        this.maxWidth728 = breakpoints[maxWidth728]

        this.condition.update(curr => curr = !this.minWidth728 && this.maxWidth728)
      });
  }
}
