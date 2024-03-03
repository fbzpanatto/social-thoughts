import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { ThoughtsListComponent } from "../thoughts-list/thoughts-list.component";
import { CreateThoughtComponent } from "../create-thought/create-thought.component";
import { FetchDataService } from '../../services/fetch-data.service';
import { SeletorService } from '../../services/seletor.service';
import { UserInputService } from '../../services/user-input.service';
import { Utils } from '../../utils/utils';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-application-wrapper',
  standalone: true,
  templateUrl: './application-wrapper.component.html',
  styleUrls: ['./application-wrapper.component.css', '../../styles/generic.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ToolbarComponent,
    SearchBarComponent,
    ThoughtsListComponent,
    CreateThoughtComponent
  ]
})
export class ApplicationWrapperComponent {

  title = 'social-thoughts';
  seletor: Signal<boolean> = inject(SeletorService).seletor

  #utils = inject(Utils)
  #authService = inject(AuthService)
  #fetchService = inject(FetchDataService)
  #userInputService = inject(UserInputService)

  addThought() {

    const time = this.#utils.fireBaseTimeStamp()
    const text = this.#userInputService.userInputValue
    const uid = this.#authService.uid
    const username = this.#authService.username

    this.#fetchService.addThought({ textContent: text, username: username, timestamp: time, like: 0, userUid: uid })
  }
}
