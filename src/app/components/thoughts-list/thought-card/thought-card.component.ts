import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-thought-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './thought-card.component.html',
  styleUrl: './thought-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThoughtCardComponent { }
