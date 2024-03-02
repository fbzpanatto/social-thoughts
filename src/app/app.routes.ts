import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./components/application-wrapper/application-wrapper.component').then(m => m.ApplicationWrapperComponent) },
  { path: 'register', data: { register: true }, loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent) },
  { path: 'login', loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent) },
  { path: '**', redirectTo: '/home' }
];
