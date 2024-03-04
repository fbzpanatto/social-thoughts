import { Injectable, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInputService {

  #userInput = new FormControl('')
  auxVar = signal<string | null>('')

  get userInput$() {
    return this.#userInput.valueChanges
      .pipe(
        tap(values => { this.auxVar.update(curr => curr = values) }),
        startWith(null),
        debounceTime(400),
        distinctUntilChanged()
      )
  }

  get userInputValue() { return this.#userInput.value }

  set userInput(formControl: FormControl) { this.#userInput = formControl }
}
