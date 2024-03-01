import { Component, Signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { ThoughtsListComponent } from "./components/thoughts-list/thoughts-list.component";
import { CreateThoughtComponent } from "./components/create-thought/create-thought.component";
import { SeletorService } from './services/seletor.service';
import { FetchDataService } from './services/fetch-data.service';
import { Timestamp } from '@angular/fire/firestore';
import { UserInputService } from './services/user-input.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, ToolbarComponent, SearchBarComponent, ThoughtsListComponent, CreateThoughtComponent]
})
export class AppComponent {

  title = 'social-thoughts';
  seletor: Signal<boolean> = inject(SeletorService).seletor

  #fetchService = inject(FetchDataService)
  #userInputService = inject(UserInputService)

  addThought() {

    // TODO: movo to a service
    const now = new Date();
    const timestamp = Timestamp.fromDate(now);
    const time = new Timestamp(timestamp.seconds, timestamp.nanoseconds)

    const text = this.#userInputService.userInputValue

    this.#fetchService.addThought({ textContent: text, username: 'fbzpanatto', timestamp: time, like: 0 })
  }
}
