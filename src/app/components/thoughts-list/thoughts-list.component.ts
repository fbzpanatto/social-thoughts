import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FetchDataService } from '../../services/fetch-data.service';
import { Observable } from 'rxjs';
import { Thought } from '../../interfaces/interfaces';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

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
		MatIconModule
	]
})
export class ThoughtsListComponent implements OnInit {

	#fetchService = inject(FetchDataService)

	thoughts$?: Observable<Thought[]>

	ngOnInit(): void { this.thoughts$ = this.#fetchService.getThoughts() }

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
