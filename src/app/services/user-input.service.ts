import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInputService {

  #userInput = new FormControl<string | null>(null)

  get userInput$() {
    return this.#userInput.valueChanges.pipe(startWith(null), debounceTime(400), distinctUntilChanged())
  }

  get userInputValue() { return this.#userInput.value }

  set userInput(formControl: FormControl) { this.#userInput = formControl }
}
