import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { FetchDataService } from '../../services/fetch-data.service';
import { UserInputService } from '../../services/user-input.service';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'app-create-thought',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './create-thought.component.html',
  styleUrls: ['./create-thought.component.css', '../../styles/generic.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateThoughtComponent {

  #utils = inject(Utils)
  #authService = inject(AuthService)
  #fetchService = inject(FetchDataService)
  #userInputService = inject(UserInputService)

  addThought() {

    const time = this.#utils.fireBaseTimeStamp()
    const text = this.#userInputService.userInputValue
    const uid = this.#authService.uid
    const username = this.#authService.username

    this.#fetchService.addThought({ textContent: text ?? '', username: username, timestamp: time, like: 0, userUid: uid, likedBy: [] })
  }

  get isAuth() { return this.#authService.isAuthenticatedSignal }

  get hasText() { return !!this.#userInputService.userInputValue }
}
