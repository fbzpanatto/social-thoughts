import { Routes } from '@angular/router';
import { ApplicationWrapperComponent } from './components/application-wrapper/application-wrapper.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: ApplicationWrapperComponent },
  { path: '**', redirectTo: '/home' }
];
