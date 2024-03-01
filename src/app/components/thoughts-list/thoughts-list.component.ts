import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ThoughtCardComponent } from "./thought-card/thought-card.component";
import { FetchDataService } from '../../services/fetch-data.service';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/interfaces';

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
export class ThoughtsListComponent implements OnInit {

    fetchService = inject(FetchDataService)

    users$?: Observable<User[]>

    ngOnInit(): void {

        this.users$ = this.fetchService.getUsers()

    }
}
