import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FetchDataService } from '../../services/fetch-data.service';
import { Observable } from 'rxjs';
import { Thought } from '../../interfaces/interfaces';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-thoughts-list',
    standalone: true,
    templateUrl: './thoughts-list.component.html',
    styleUrl: './thoughts-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule
    ]
})
export class ThoughtsListComponent implements OnInit {

    fetchService = inject(FetchDataService)

    thoughts$?: Observable<Thought[]>

    ngOnInit(): void {

        this.thoughts$ = this.fetchService.getThoughts()

    }
}
