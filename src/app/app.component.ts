import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApplicationWrapperComponent } from "./components/application-wrapper/application-wrapper.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, ApplicationWrapperComponent]
})
export class AppComponent {}
