import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { SeletorService } from '../../services/seletor.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    FormsModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css', '../../styles/generic.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {

  selectedRadio: number | null = 1;

  #seletorService = inject(SeletorService)
  
  select($event: number) {

    const el = this.options.find(option => option.id === $event)

    this.#seletorService.setSeletor(el?.option as boolean)

  }

  get options() {
    return [
      {
        id: 1,
        option: false,
        name: 'SEARCH'
      },
      {
        id: 2,
        option: true,
        name: 'ADD'
      }
    ]
  }
}
