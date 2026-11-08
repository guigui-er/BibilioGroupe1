import { Routes } from '@angular/router';
import { GenrePage } from './page/genre-page/genre-page';
import { AuteurPage } from './page/auteur-page/auteur-page';
import { EditeurPage } from './page/editeur-page/editeur-page';
import { LivrePage } from './page/livre-page/livre-page';
import { LoginPage } from './page/login-page/login-page';
import { authGuard } from './guard/auth-guard';

export const routes: Routes = [
   {
    path: '',
    redirectTo: 'livre',
    pathMatch: 'full'
  },
  // Page Genre
  {
    path: 'genre',
    component: GenrePage,
    canActivate: [ authGuard ]
  },
  // Page Auteur
  {
    path: 'auteur',
    component: AuteurPage,
    canActivate: [ authGuard ]
  },
  {
    path: 'editeur',
    component: EditeurPage,
    canActivate: [ authGuard ]
  },
  {
    path: 'livre',
    component: LivrePage,
    canActivate: [ authGuard ]
  },
    {
    path: 'login',
    component: LoginPage
  },
];
