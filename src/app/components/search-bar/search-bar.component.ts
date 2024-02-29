import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>search-bar works!</p>`,
  styleUrl: './search-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent { }
