import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>toolbar works!</p>`,
  styleUrl: './toolbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent { }
