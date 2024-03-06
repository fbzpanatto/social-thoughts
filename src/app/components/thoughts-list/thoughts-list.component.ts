import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren, inject } from '@angular/core';
import { FetchDataService } from '../../services/fetch-data.service';
import { Observable, combineLatest, switchMap } from 'rxjs';
import { Thought } from '../../interfaces/interfaces';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { UserInputService } from '../../services/user-input.service';
import { AuthService } from '../../services/auth.service';
import { CheckIconPipe } from '../pipes/check-icon.pipe';
import { TimestampPipe } from '../pipes/timestamp.pipe';
import { CheckOwnerPipe } from "../pipes/check-owner.pipe";

@Component({
	selector: 'app-thoughts-list',
	standalone: true,
	templateUrl: './thoughts-list.component.html',
	styleUrls: ['./thoughts-list.component.css', '../../styles/generic.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule, ReactiveFormsModule, CheckIconPipe, TimestampPipe, CheckOwnerPipe]
})
export class ThoughtsListComponent implements OnInit {

	#fetchService = inject(FetchDataService)
	#userInputService = inject(UserInputService)
	#authService = inject(AuthService)
	#lastDivRef?: HTMLElement

	@ViewChildren('cardcontainer') cardContainers?: QueryList<ElementRef>;

	@HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    console.log('Scrolled!', event);
  }

	thoughts$: Observable<Thought[]> = new Observable()

	ngOnInit(): void {

		this.thoughts$ = combineLatest([
			this.#userInputService.userInput$
		]).pipe(switchMap(([search]) => { return this.#fetchService.getThoughts(search) }))
	}

	changeThoughtContent(thought: Thought, txtArea: string) {
		if (txtArea.trim() != thought.textContent.trim()) {
			this.#fetchService.updateThought(thought.id as string, { ...thought, textContent: txtArea })
		}
	}

	changeThoughtLikes(thought: Thought) {

		const element = thought.likedBy.indexOf(this.uid, 0)

		if (element > -1) {
			thought.likedBy.splice(element, 1)
			thought.like = thought.like - 1
		} else {
			thought.likedBy.push(this.uid)
			thought.like = thought.like + 1
		}

		this.#fetchService.updateThought(thought.id as string, { ...thought })
	}

	expand(div: HTMLElement) {

		if((this.#lastDivRef != undefined) && div.id != this.#lastDivRef.id) {
			
			this.#lastDivRef!.style.gridColumn = 'auto'
			this.#lastDivRef!.style.gridRow = 'auto'
			
			this.#lastDivRef = div
		} else { this.#lastDivRef = div }

		const card = this.cardContainers?.find((item: ElementRef<any>) => div.id === (item.nativeElement as HTMLElement).id)?.nativeElement as HTMLElement

		card.style.gridColumn = '1 / span 2'
		card.style.gridRow = '1 / span 2'

		this.scrollToTop()
	}

	scrollToTop() {
    window.scrollTo(0, 0);
  }

	removeThought(thoughtId: string | undefined) { this.#fetchService.removeThought(thoughtId as string) }

	get isAuthenticated() { return this.#authService.isAuthenticated }

	get uid() { return this.#authService.uid }

	get username() { return this.#authService.username }
}