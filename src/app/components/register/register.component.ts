import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  #route = inject(ActivatedRoute)
  #authService = inject(AuthService)

  isRegister = signal(true)

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

  constructor(
    private fb: FormBuilder,
  ) {

    const dataSignal = toSignal<{ register?: boolean }>(this.#route.data)

    effect(() => {
      this.isRegister.update(curr => curr = dataSignal()?.register as boolean)
    }, { allowSignalWrites: true })
  }

  onSubmit() {
    console.log(this.form.value)
  }
}