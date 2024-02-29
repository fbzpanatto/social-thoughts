import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-thought',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './create-thought.component.html',
  styleUrl: './create-thought.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateThoughtComponent { }
