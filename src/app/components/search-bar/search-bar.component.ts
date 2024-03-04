import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { SeletorService } from '../../services/seletor.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserInputService } from '../../services/user-input.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css', '../../styles/generic.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit {

  userInput = new FormControl<string | null>(null)
  selectedRadio: number | null = 1;

  #seletorService = inject(SeletorService)
  #userInputService = inject(UserInputService)
  authService = inject(AuthService).isAuthenticatedSignal

  ngOnInit(): void { this.#userInputService.userInput = this.userInput }

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
