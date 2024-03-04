import { EnvironmentInjector, Injectable, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop'

@Injectable({
  providedIn: 'root'
})
export class UserInputService {

  #userInput = new FormControl<string | null>(null)
  #injector = inject(EnvironmentInjector)

  get userInputSignal() {
    return toSignal(this.#userInput.valueChanges.pipe(startWith(null), debounceTime(400), distinctUntilChanged()), { injector: this.#injector })
  }

  get userInputValue() { return this.#userInput.value }

  set userInput(formControl: FormControl) { this.#userInput = formControl }
}
