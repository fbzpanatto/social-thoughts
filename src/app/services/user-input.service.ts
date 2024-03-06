import { Injectable, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInputService {

  userInputFormControl = new FormControl<string | null>(null)
  #userInputSignal = signal<string | null>(null)

  get userInput$() {
    return this.userInputFormControl.valueChanges
      .pipe(
        tap(values => { this.#userInputSignal.update(curr => curr = values) }),
        startWith(null),
        debounceTime(400),
        distinctUntilChanged()
      )
  }

  get userInputSignal() { return this.#userInputSignal.asReadonly() }

  get userInputValue() { return this.userInputFormControl.value }

  set userInput(formControl: FormControl) { this.userInputFormControl = formControl }
}
