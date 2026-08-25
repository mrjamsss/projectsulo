import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'add-account',
    redirectTo: 'user-management',
    pathMatch: 'full',
  },
  {
    path: 'user-management',
    loadComponent: () => import('./pages/user-management/user-management.page').then( m => m.UserManagementPage)
  },

];
