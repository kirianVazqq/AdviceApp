import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetsPageRoutingModule } from './budgets-routing.module';

import { BudgetsPage } from './budgets.page';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BudgetsPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [BudgetsPage, ]
})
export class BudgetsPageModule {}
