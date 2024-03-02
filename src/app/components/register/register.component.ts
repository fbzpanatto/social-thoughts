import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {

  #route = inject(ActivatedRoute)
  isRegister = signal(true)

  constructor() {

    const dataSignal = toSignal<{ register?: boolean }>(this.#route.data)

    effect(() => {
      this.isRegister.update(curr => curr = dataSignal()?.register as boolean)
    }, { allowSignalWrites: true })
   }
}