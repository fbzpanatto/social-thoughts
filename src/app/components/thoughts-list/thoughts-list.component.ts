import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FetchDataService } from '../../services/fetch-data.service';
import { Observable, combineLatest, of, switchMap } from 'rxjs';
import { Thought } from '../../interfaces/interfaces';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { UserInputService } from '../../services/user-input.service';

@Component({
	selector: 'app-thoughts-list',
	standalone: true,
	templateUrl: './thoughts-list.component.html',
	styleUrls: ['./thoughts-list.component.css', '../../styles/generic.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		CommonModule,
		MatCardModule,
		MatButtonModule,
		MatDividerModule,
		MatIconModule,
		ReactiveFormsModule
	]
})
export class ThoughtsListComponent implements OnInit {

	#fetchService = inject(FetchDataService)
	#userInputService = inject(UserInputService)

	thoughts$: Observable<Thought[]> = new Observable()

	ngOnInit(): void {

		this.thoughts$ = this.#fetchService.getThoughts()

		this.thoughts$ = combineLatest([
			this.#userInputService.userInput$,
			this.thoughts$
		])
			.pipe(
				switchMap(([search, thoughts]) => {
					return of(thoughts.filter(el => el.textContent.includes(search ?? '')))
				})
			)
	}

	changeThoughtContent(thought: Thought, txtArea: string) {
		if (txtArea.trim() != thought.textContent.trim()) {
			this.#fetchService.updateThought(thought.id as string, { ...thought, textContent: txtArea })
		}
	}

	changeThoughtLikes(thought: Thought) {
		this.#fetchService.updateThought(thought.id as string, { ...thought, like: thought.like += 1 })
	}

	removeThought(thoughtId: string | undefined) {
		this.#fetchService.removeThought(thoughtId as string)
	}
}
