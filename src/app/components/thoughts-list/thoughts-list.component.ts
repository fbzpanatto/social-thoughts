import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThoughtCardComponent } from "./thought-card/thought-card.component";

@Component({
    selector: 'app-thoughts-list',
    standalone: true,
    templateUrl: './thoughts-list.component.html',
    styleUrl: './thoughts-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ThoughtCardComponent
    ]
})
export class ThoughtsListComponent { }
