import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { FetchDataService } from '../../services/fetch-data.service';
import { UserInputService } from '../../services/user-input.service';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'app-create-thought',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './create-thought.component.html',
  styleUrls: ['./create-thought.component.css', '../../styles/generic.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateThoughtComponent {

  #utils = inject(Utils)
  #authService = inject(AuthService)
  #fetchService = inject(FetchDataService)
  #userInputService = inject(UserInputService)

  #hasText = signal<boolean>(false)
  #isAuth = signal<boolean>(false)
  #condition = signal<boolean>(false)

  constructor() {
    effect(() => {
      this.#hasText.update(curr => curr = !!this.#userInputService.userInputSignal()?.length)
      this.#isAuth.update(curr => curr = this.#authService.isAuthenticated)
      this.#condition.update(curr => curr = this.isAuth() && this.hasText())
    }, { allowSignalWrites: true })
  }

  addThought() {

    const time = this.#utils.fireBaseTimeStamp()
    const text = this.#userInputService.userInputValue
    const uid = this.#authService.uid
    const username = this.#authService.username

    this.#fetchService.addThought({ textContent: text ?? '', username: username, timestamp: time, like: 0, userUid: uid, likedBy: [] })
  }

  get condition() { return this.#condition.asReadonly() }
  get isAuth() { return this.#isAuth.asReadonly() }
  get hasText() { return this.#hasText.asReadonly() }
}
