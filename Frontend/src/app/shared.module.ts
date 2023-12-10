import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarAdminComponent } from './components/navbar-admin/navbar-admin.component';


@NgModule({
  declarations: [
    NavbarComponent, NavbarAdminComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent, NavbarAdminComponent
  ]
})
export class SharedModule { }
