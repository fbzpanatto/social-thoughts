import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FetchDataService } from '../../services/fetch-data.service';
import { Observable } from 'rxjs';
import { Thought } from '../../interfaces/interfaces';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

@Component({
    selector: 'app-thoughts-list',
    standalone: true,
    templateUrl: './thoughts-list.component.html',
    styleUrls: ['./thoughts-list.component.css', '../../styles/generic.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatDividerModule
    ]
})
export class ThoughtsListComponent implements OnInit {

    fetchService = inject(FetchDataService)

    thoughts$?: Observable<Thought[]>

    ngOnInit(): void {

        this.thoughts$ = this.fetchService.getThoughts()

    }
}
