import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class RegisterComponent {

  #route = inject(ActivatedRoute)
  #authService = inject(AuthService)
  #router = inject(Router)

  isRegister = signal(true)

  #errorMessage: string | null = null;

  form = this.fb.group({
    username: ['', {
      validators: [Validators.required]
    }],
    email: ['', {
      validators: [Validators.required, Validators.email]
    }],
    password: ['', {
      validators: [Validators.required, Validators.minLength(8)]
    }],
  })

  constructor(private fb: FormBuilder) {

    const dataSignal = toSignal<{ register?: boolean }>(this.#route.data)

    effect(() => {

      this.isRegister.update(curr => curr = dataSignal()?.register as boolean)
    }, { allowSignalWrites: true })
  }

  onSubmit() {

    const { email, password, username } = this.form.getRawValue()

    const condition = this.isRegister()

    if (condition) {
      this.#authService.register({ email: email as string, password: password as string, username: username as string })
        .subscribe({
          next: () => this.#router.navigate(['home']),
          error: (err) => {
            this.errorMessage = err.code
            console.log('this.errorMessage', this.errorMessage)
          }
        })
    } else {
      this.#authService.login(email as string, password as string)
        .subscribe({
          next: () => this.#router.navigate(['home']),
          error: (err) => { this.errorMessage = err.code }
        })
    }
  }

  get errorMessage() { return this.#errorMessage }

  set errorMessage(value: string | null) { this.#errorMessage = value }
}