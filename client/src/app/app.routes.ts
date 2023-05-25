import { Routes } from '@angular/router';
import { ChickensComponent } from './chickens/chickens.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'chickens' },
  { path: 'chickens', component: ChickensComponent },
  {
    path: 'chickens/:chickenId',
    loadComponent: () =>
      import('./chicken/chicken.component').then((mod) => mod.ChickenComponent),
  },
];
