import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-thought-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './thought-card.component.html',
  styleUrls: ['./thought-card.component.css', '../../../styles/generic.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThoughtCardComponent { }
