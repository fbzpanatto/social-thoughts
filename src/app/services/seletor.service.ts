import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeletorService {

  #seletor = signal<boolean>(false)

  get seletor(): Signal<boolean> {
    return this.#seletor.asReadonly()
  }

  setSeletor(value: boolean): void {
    this.#seletor.update(curr => curr = value)
  }
}