import { Routes } from '@angular/router';
import { Layout } from './layout/layout';

export const layoutRoutes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../modules/dashboard/dashboard.routes')
            .then(m => m.routes)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];
