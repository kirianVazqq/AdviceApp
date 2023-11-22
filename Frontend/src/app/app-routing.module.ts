import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'form-client',
    loadChildren: () => import('./pages/form-client/form-client.module').then( m => m.FormClientPageModule)
  },
  {
    path: 'budgets',
    loadChildren: () => import('./pages/budgets/budgets.module').then( m => m.BudgetsPageModule)
  },
  {
    path: 'form-budget',
    loadChildren: () => import('./pages/form-budget/form-budget.module').then( m => m.FormBudgetPageModule)
  },
  {
    path: 'form-budget/:flag/:budget',
    loadChildren: () => import('./pages/form-budget/form-budget.module').then( m => m.FormBudgetPageModule)
  },
  {
    path: 'client',
    loadChildren: () => import('./pages/client/client.module').then( m => m.ClientPageModule)
  },
  {
    path: 'form-client/:flag/:client',
    loadChildren: () => import('./pages/form-client/form-client.module').then( m => m.FormClientPageModule)
  },






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
