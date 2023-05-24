import { Routes } from '@angular/router';
import { ChickensComponent } from './chickens/chickens.component';
import { ChickenComponent } from './chicken/chicken.component';
import { AddChickenComponent } from './add-chicken/add-chicken.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'chickens' },
  { path: 'chickens', component: ChickensComponent },
  { path: 'chickens/add', component: AddChickenComponent },
  { path: 'chickens/:chickenId', component: ChickenComponent },
];
