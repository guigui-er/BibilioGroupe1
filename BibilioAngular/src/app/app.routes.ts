import { Routes } from '@angular/router';
import { GenrePage } from './page/genre-page/genre-page';

export const routes: Routes = [
   {
    path: '',
    redirectTo: 'genre',
    pathMatch: 'full'
  },
  // Page Genre
  {
    path: 'genre',
    component: GenrePage
  }
];
