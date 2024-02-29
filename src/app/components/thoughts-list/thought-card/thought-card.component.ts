import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-thought-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>thought-card works!</p>`,
  styleUrl: './thought-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThoughtCardComponent { }
