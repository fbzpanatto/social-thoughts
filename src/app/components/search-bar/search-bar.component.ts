import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css', '../../styles/generic.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent { }
