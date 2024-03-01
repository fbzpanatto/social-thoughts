import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { ThoughtsListComponent } from "./components/thoughts-list/thoughts-list.component";
import { CreateThoughtComponent } from "./components/create-thought/create-thought.component";
import { SeletorService } from './services/seletor.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, ToolbarComponent, SearchBarComponent, ThoughtsListComponent, CreateThoughtComponent]
})
export class AppComponent {
  title = 'social-thoughts';

  seletor = inject(SeletorService).seletor
}
