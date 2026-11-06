import { Routes } from '@angular/router';
import { GenrePage } from './page/genre-page/genre-page';
import { AuteurPage } from './page/auteur-page/auteur-page';

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
  },
  // Page Auteur
  {
    path: 'auteur',
    component: AuteurPage
  }
];
