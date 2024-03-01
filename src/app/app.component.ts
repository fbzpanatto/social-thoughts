import { Component, Signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { ThoughtsListComponent } from "./components/thoughts-list/thoughts-list.component";
import { CreateThoughtComponent } from "./components/create-thought/create-thought.component";
import { SeletorService } from './services/seletor.service';
import { FetchDataService } from './services/fetch-data.service';
import { Timestamp } from '@angular/fire/firestore';

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

  addThought() {

    // TODO: movo to a service
    const now = new Date();
    const timestamp = Timestamp.fromDate(now);
    const time = new Timestamp(timestamp.seconds, timestamp.nanoseconds)

    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

    this.#fetchService.addThought({ textContent: text, username: 'fbzpanatto', timestamp: time, like: 0 })
  }
}
