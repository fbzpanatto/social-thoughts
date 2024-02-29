import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-thoughts-list',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>thoughts-list works!</p>`,
  styleUrl: './thoughts-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThoughtsListComponent { }
