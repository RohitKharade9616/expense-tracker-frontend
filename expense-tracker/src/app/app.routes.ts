import { Routes } from '@angular/router';
import { Layout } from './layout/layout/layout';

// export const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'auth/register',
//     pathMatch: 'full'
//   },
//   {
//     path: 'auth',
//     loadChildren: () =>
//       import('./modules/auth/auth.routes')
//         .then(m => m.AUTH_ROUTES)
//   },
//   {
//     path: '',
//     component: Layout,
//     children: [
//       {
//         path: 'home',
//         redirectTo: 'dashboard',
//         pathMatch: 'full'
//       },
//       {
//         path: 'dashboard',
//         loadChildren: () =>
//           import('./modules/dashboard/dashboard.routes')
//             .then(m => m.routes)
//       },
//       {
//         path: 'income-management',
//         loadChildren: () =>
//           import('./modules/income-management/income-management.routes')
//             .then(m => m.routes)
//       },
//       {
//         path: 'expense-management',
//         loadChildren: () =>
//           import('./modules/expense-management/expense-management.routes')
//             .then(m => m.routes)
//       },
//       {
//         path: 'tax-deduction',
//         loadChildren: () =>
//           import('./modules/deduction-management/deduction-management-routes')
//             .then(m => m.routes)
//       },
//       {
//         path: 'tax-calculation',
//         loadChildren: () =>
//           import('./modules/tax-management/tax-management.routes')
//             .then(m => m.TAX_MANAGEMENT_ROUTES)
//       }
//     ]
//   }
// ];
export const routes: Routes = [
  // ✅ Default redirect
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  // ✅ Auth routes (NO layout)
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.routes')
        .then(m => m.AUTH_ROUTES)
  },

  // ✅ App routes (WITH layout)
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.routes')
            .then(m => m.routes)
      },
      {
        path: 'income-management',
        loadChildren: () =>
          import('./modules/income-management/income-management.routes')
            .then(m => m.routes)
      },
      {
        path: 'expense-management',
        loadChildren: () =>
          import('./modules/expense-management/expense-management.routes')
            .then(m => m.routes)
      },
      {
        path: 'tax-deduction',
        loadChildren: () =>
          import('./modules/deduction-management/deduction-management-routes')
            .then(m => m.routes)
      },
      {
        path: 'tax-calculation',
        loadChildren: () =>
          import('./modules/tax-management/tax-management.routes')
            .then(m => m.TAX_MANAGEMENT_ROUTES)
      }
    ]
  },

  // ✅ Optional wildcard (good practice)
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];