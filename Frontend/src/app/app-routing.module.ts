import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./pages/start/start.module').then( m => m.StartPageModule)
  },
  {
    path: 'main',
    canActivate: [AuthGuard],
    data: { allowedRoles: ['adviser'] },
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'register',
    canActivate: [AuthGuard],
    data: { allowedRoles: ['admin'] },
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'form-client',
    canActivate: [AuthGuard],
    data: { allowedRoles: ['adviser'] },
    loadChildren: () => import('./pages/form-client/form-client.module').then( m => m.FormClientPageModule)
  },
  {
    path: 'budgets',
    canActivate: [AuthGuard],
    data: { allowedRoles: ['adviser'] },
    loadChildren: () => import('./pages/budgets/budgets.module').then( m => m.BudgetsPageModule)
  },
  {
    path: 'form-budget',
    canActivate: [AuthGuard],
    data: { allowedRoles: ['adviser'] },
    loadChildren: () => import('./pages/form-budget/form-budget.module').then( m => m.FormBudgetPageModule)
  },
  {
    path: 'form-budget/:flag/:budget',
    canActivate: [AuthGuard],
    data: { allowedRoles: ['adviser'] },
    loadChildren: () => import('./pages/form-budget/form-budget.module').then( m => m.FormBudgetPageModule)
  },
  {
    path: 'client',
    canActivate: [AuthGuard],
    data: { allowedRoles: ['adviser'] },
    loadChildren: () => import('./pages/client/client.module').then( m => m.ClientPageModule)
  },
  {
    path: 'form-client/:flag/:client',
    canActivate: [AuthGuard],
    data: { allowedRoles: ['adviser'] },
    loadChildren: () => import('./pages/form-client/form-client.module').then( m => m.FormClientPageModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    data: { allowedRoles: ['adviser'] },
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'adviser',
    canActivate: [AuthGuard],
    data: { allowedRoles: ['admin'] },
    loadChildren: () => import('./pages/adviser/adviser.module').then( m => m.AdviserPageModule)
  },








];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
