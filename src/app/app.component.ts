import { Component, Signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { ThoughtsListComponent } from "./components/thoughts-list/thoughts-list.component";
import { CreateThoughtComponent } from "./components/create-thought/create-thought.component";
import { SeletorService } from './services/seletor.service';
import { FetchDataService } from './services/fetch-data.service';
import { UserInputService } from './services/user-input.service';
import { Utils } from './utils/utils';

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

  #utils = inject(Utils)
  #fetchService = inject(FetchDataService)
  #userInputService = inject(UserInputService)

  addThought() {

    const time = this.#utils.fireBaseTimeStamp()
    const text = this.#userInputService.userInputValue

    this.#fetchService.addThought({ textContent: text, username: 'fbzpanatto', timestamp: time, like: 0 })
  }
}
