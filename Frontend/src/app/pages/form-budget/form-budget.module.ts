import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormBudgetPageRoutingModule } from './form-budget-routing.module';

import { FormBudgetPage } from './form-budget.page';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormBudgetPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
   

  ],
  declarations: [FormBudgetPage,]
})
export class FormBudgetPageModule {}
