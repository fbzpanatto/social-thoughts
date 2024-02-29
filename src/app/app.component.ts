import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { ThoughtsListComponent } from "./components/thoughts-list/thoughts-list.component";
import { CreateThoughtComponent } from "./components/create-thought/create-thought.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, ToolbarComponent, SearchBarComponent, ThoughtsListComponent, CreateThoughtComponent]
})
export class AppComponent {
  title = 'social-thoughts';
}
