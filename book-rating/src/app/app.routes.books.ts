import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export default [
  { path: '', component: DashboardComponent },

  // lazy loading von einer einzelnen Component
  { path: ':isbn', loadComponent: () => import('./book-details/book-details.component') },
] as Route[];
