import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeletorService {

  #seletor = signal(false)

  get seletor(){
    return this.#seletor.asReadonly()
  }

  setSeletor(value: boolean) {
    this.#seletor.update(curr => curr = value)
  }
}