import { Routes } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./layout/layout.routes')
  //       .then(m => m.routes)
  // },
    {
      path:'',
      redirectTo:'auth/login',
      pathMatch:'full'
    },
    {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.routes')
        .then(m => m.AUTH_ROUTES)
  }
];
