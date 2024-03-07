import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren, effect, inject, signal } from '@angular/core';
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
import { ChangeIconPipe } from "../pipes/change-icon.pipe";
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { environment as env } from '../../environments/environment';

@Component({
	selector: 'app-thoughts-list',
	standalone: true,
	templateUrl: './thoughts-list.component.html',
	styleUrls: ['./thoughts-list.component.css', '../../styles/generic.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule, ReactiveFormsModule, CheckIconPipe, TimestampPipe, CheckOwnerPipe, ChangeIconPipe]
})
export class ThoughtsListComponent implements OnInit {

	@ViewChildren('cardcontainer') cardContainers?: QueryList<ElementRef>;

	#fetchService = inject(FetchDataService)
	#userInputService = inject(UserInputService)
	#authService = inject(AuthService)
	#lastDivRef?: HTMLElement
	#lastScrollY = env.zero
	#mobileQueryListener: (() => void) | undefined;

	thoughts$: Observable<Thought[]> = new Observable()
	mobileQuery!: MediaQueryList;
	minWidth728 = false
	maxWidth728 = true

	isMaxWidth728 = signal(true)
	isExpanded = signal(false)

	constructor(
		private responsive: BreakpointObserver,
		media: MediaMatcher,
		changeDetectorRef: ChangeDetectorRef,
	) {
		this.mobileQuery = media.matchMedia('(max-width: 960px)')
		this.#mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addEventListener('change', this.#mobileQueryListener);

		effect(() => {

			const isMaxWidth728 = this.isMaxWidth728()

			console.log('isMaxWidth728', isMaxWidth728)

			// if (isMaxWidth728 && this.#lastDivRef) {
			// 	this.#lastDivRef.style.gridColumn = env.auto
			// 	this.#lastDivRef.style.gridRow = env.auto
			// 	this.#lastDivRef.style.height = env.auto
			// 	this.#lastScrollY = this.#lastDivRef.offsetTop
			// 	this.scrollToYPosition((this.#lastDivRef.offsetTop) - 50)
			// } else if (this.#lastDivRef && !isMaxWidth728 && this.#lastDivRef.style.height === env.vh40) {
			// 	this.#lastDivRef.style.gridColumn = '1 / span 2'
			// 	this.#lastDivRef.style.gridRow = '1 / span 2'
			// 	this.#lastDivRef.style.height = env.auto
			// }
		})
	}

	ngOnInit(): void {

		this.setBreakpointObserver()

		this.thoughts$ = combineLatest([
			this.#userInputService.userInput$
		]).pipe(switchMap(([search]) => { return this.#fetchService.getThoughts(search) }))
	}

	setBreakpointObserver() {

		this.responsive
			.observe([env.minWidth728, env.maxWidth728])
			.subscribe(result => {
				const breakpoints = result.breakpoints;

				this.minWidth728 = breakpoints[env.minWidth728];
				this.maxWidth728 = breakpoints[env.maxWidth728]

				const condition = !this.minWidth728 && this.maxWidth728

				this.isMaxWidth728.update(curr => curr = condition)
			});
	}

	changeThoughtContent(thought: Thought, txtArea: string) {
		if (txtArea.trim() != thought.textContent.trim()) {
			this.#fetchService.updateThought(thought.id as string, { ...thought, textContent: txtArea })
		}
	}

	changeThoughtLikes(thought: Thought) {

		const element = thought.likedBy.indexOf(this.uid, env.zero)

		if (element > -1) {
			thought.likedBy.splice(element, parseInt(env.one))
			thought.like = thought.like - parseInt(env.one)
		} else {
			thought.likedBy.push(this.uid)
			thought.like = thought.like + parseInt(env.one)
		}

		this.#fetchService.updateThought(thought.id as string, { ...thought })
	}

	expand(clickedThought: HTMLElement) {

		const isExpanded = this.isExpanded()

		if (this.#lastDivRef === undefined) {

			this.isExpanded.update(curr => curr = true)
			this.#lastDivRef = this.lastDivSettings(clickedThought)

		} else if (this.#lastDivRef && clickedThought.id === this.#lastDivRef.id) {

			if (isExpanded) {
				this.isExpanded.update(curr => curr = false)
			} else {
				this.isExpanded.update(curr => curr = true)
			}

			this.#lastDivRef = this.lastDivSettings(clickedThought)

		} else if (this.#lastDivRef && clickedThought.id != this.#lastDivRef.id) {

			if (isExpanded) {

				this.#lastDivRef.style.gridColumn = env.auto
				this.#lastDivRef.style.gridRow = env.auto
				this.#lastDivRef.style.height = env.auto

				this.#lastDivRef = this.lastDivSettings(clickedThought)

			} else {

				this.isExpanded.update(curr => curr = true)
				this.#lastDivRef = this.lastDivSettings(clickedThought)

			}
		}
	}

	scrollToYPosition(yPos: number) { window.scrollTo(0, yPos) }

	removeThought(thoughtId: string | undefined) { this.#fetchService.removeThought(thoughtId as string) }

	lastDivSettings(divCard: HTMLElement) {

		const el = this.cardContainers?.find((item: ElementRef<any>) => divCard.id === (item.nativeElement as HTMLElement).id)?.nativeElement as HTMLElement

		const isMaxWidth728 = this.isMaxWidth728()
		const isExpanded = this.isExpanded()

		if (isExpanded && !isMaxWidth728) {
			el.style.gridColumn = '1 / span 2'
			el.style.gridRow = '1 / span 2'
			el.style.height = env.auto
			this.scrollToYPosition(el.clientTop)

		} else if (isExpanded && isMaxWidth728) {
			el.style.gridColumn = env.one
			el.style.gridRow = env.one
			el.style.height = env.vh40
			this.scrollToYPosition(el.clientTop)

		} else if (!isExpanded && isMaxWidth728) {
			el.style.gridColumn = env.auto
			el.style.gridRow = env.auto
			el.style.height = env.auto
			this.scrollToYPosition(el.offsetTop - el.offsetHeight)

		} else if (!isExpanded && !isMaxWidth728) {
			el.style.gridColumn = env.auto
			el.style.gridRow = env.auto
			el.style.height = env.auto
			this.scrollToYPosition(el.offsetTop - el.offsetHeight)
		}

		el.focus()

		return el
	}

	get lastDivRef() { return this.#lastDivRef }

	set lastDivRef(value: HTMLElement | undefined) { this.#lastDivRef = value }

	get isAuthenticated() { return this.#authService.isAuthenticated }

	get uid() { return this.#authService.uid }

	get username() { return this.#authService.username }

	get windowScrollY() { return window.scrollY }
}