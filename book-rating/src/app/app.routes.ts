import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'books' },

  // lazy loading von mehreren Routen / Components !
  { path: 'books', loadChildren: () => import('./app.routes.books') },
];
